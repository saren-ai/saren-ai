import { describe, expect, it } from "vitest";
import type { PagefindResultData } from "@/components/search/PagefindProvider";
import {
  partitionSearchResults,
  rankSearchResults,
  scoreSearchResult,
} from "@/lib/search-rank";

function result(url: string, title: string, excerpt = ""): PagefindResultData {
  return {
    url: `https://saren.ai${url}.html`,
    meta: { title, section: "Studio" },
    excerpt,
    content: excerpt,
  };
}

describe("search-rank", () => {
  it("ranks the dedicated Oblique Techniques page above hub pages that mention it", () => {
    const query = "Oblique Techniques";
    const dedicated = result(
      "/studio/oblique-techniques",
      "Oblique Techniques",
      "Prompt Against the Machine"
    );
    const studioHub = result(
      "/studio",
      "Studio",
      "Oblique Techniques and other creative work"
    );
    const seriesHub = result(
      "/studio/ai-for-liberal-arts",
      "AI for Liberal Arts Majors",
      "Start with Oblique Techniques"
    );

    const ranked = rankSearchResults([studioHub, seriesHub, dedicated], query);

    expect(ranked[0].meta.title).toBe("Oblique Techniques");
    expect(scoreSearchResult(dedicated, query)).toBeGreaterThan(
      scoreSearchResult(studioHub, query)
    );
  });

  it("partitions into primary and mention tiers", () => {
    const query = "Oblique Techniques";
    const { primary, mentions } = partitionSearchResults(
      [
        result("/studio", "Studio", "Oblique Techniques promo"),
        result("/studio/oblique-techniques", "Oblique Techniques", "Skills list"),
      ],
      query
    );

    expect(primary).toHaveLength(1);
    expect(primary[0].meta.title).toBe("Oblique Techniques");
    expect(mentions).toHaveLength(1);
    expect(mentions[0].meta.title).toBe("Studio");
  });
});
