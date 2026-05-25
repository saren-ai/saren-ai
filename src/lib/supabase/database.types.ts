export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_signals: {
        Row: {
          contact_id: string | null
          detected_at: string | null
          id: string
          notes: string | null
          score: number | null
          signal_id: string
          vector: string | null
        }
        Insert: {
          contact_id?: string | null
          detected_at?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          signal_id: string
          vector?: string | null
        }
        Update: {
          contact_id?: string | null
          detected_at?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          signal_id?: string
          vector?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_signals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_sources: {
        Row: {
          contact_id: string | null
          id: string
          imported_at: string | null
          raw: Json | null
          source: string | null
          source_id: string | null
        }
        Insert: {
          contact_id?: string | null
          id?: string
          imported_at?: string | null
          raw?: Json | null
          source?: string | null
          source_id?: string | null
        }
        Update: {
          contact_id?: string | null
          id?: string
          imported_at?: string | null
          raw?: Json | null
          source?: string | null
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_sources_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          linkedin_url: string | null
          location: string | null
          notes: string | null
          phone: string | null
          segment: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          segment?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          segment?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      outreach_pages: {
        Row: {
          company: string | null
          cta_href: string | null
          cta_text: string | null
          industry: string | null
          pain_point: string | null
          published_at: string | null
          role: string | null
          slug: string
          tools: Json | null
          view_count: number | null
        }
        Insert: {
          company?: string | null
          cta_href?: string | null
          cta_text?: string | null
          industry?: string | null
          pain_point?: string | null
          published_at?: string | null
          role?: string | null
          slug: string
          tools?: Json | null
          view_count?: number | null
        }
        Update: {
          company?: string | null
          cta_href?: string | null
          cta_text?: string | null
          industry?: string | null
          pain_point?: string | null
          published_at?: string | null
          role?: string | null
          slug?: string
          tools?: Json | null
          view_count?: number | null
        }
        Relationships: []
      }
      sequences: {
        Row: {
          contact_id: string | null
          id: string
          outreach_page_slug: string | null
          play: string
          started_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contact_id?: string | null
          id?: string
          outreach_page_slug?: string | null
          play: string
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_id?: string | null
          id?: string
          outreach_page_slug?: string | null
          play?: string
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sequences_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_outputs: {
        Row: {
          contact_id: string | null
          created_at: string | null
          export_format: string | null
          exported_at: string | null
          id: string
          input: Json | null
          output: Json | null
          sequence_id: string | null
          session_id: string | null
          tool_id: string
          version: number
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          export_format?: string | null
          exported_at?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          sequence_id?: string | null
          session_id?: string | null
          tool_id: string
          version?: number
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          export_format?: string | null
          exported_at?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          sequence_id?: string | null
          session_id?: string | null
          tool_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "tool_outputs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_outputs_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      touches: {
        Row: {
          body_md: string | null
          channel: string | null
          clicked_at: string | null
          id: string
          notes: string | null
          opened_at: string | null
          reply_at: string | null
          scheduled_at: string | null
          sent_at: string | null
          sentiment: string | null
          sequence_id: string | null
          status: string | null
          subject: string | null
          thread: Json
          touch_num: number
        }
        Insert: {
          body_md?: string | null
          channel?: string | null
          clicked_at?: string | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          reply_at?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sentiment?: string | null
          sequence_id?: string | null
          status?: string | null
          subject?: string | null
          thread?: Json
          touch_num: number
        }
        Update: {
          body_md?: string | null
          channel?: string | null
          clicked_at?: string | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          reply_at?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sentiment?: string | null
          sequence_id?: string | null
          status?: string | null
          subject?: string | null
          thread?: Json
          touch_num?: number
        }
        Relationships: [
          {
            foreignKeyName: "touches_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "sequences"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_page_view: { Args: { page_slug: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
