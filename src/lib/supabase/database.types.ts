export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          segment?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      networking_contacts: {
        Row: {
          channel: string | null
          created_at: string | null
          date_contacted: string | null
          due_date: string | null
          email: string | null
          id: string
          last_touchpoint: string | null
          name: string
          next_action: string | null
          notes: string | null
          organization: string | null
          phone: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          date_contacted?: string | null
          due_date?: string | null
          email?: string | null
          id?: string
          last_touchpoint?: string | null
          name: string
          next_action?: string | null
          notes?: string | null
          organization?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          date_contacted?: string | null
          due_date?: string | null
          email?: string | null
          id?: string
          last_touchpoint?: string | null
          name?: string
          next_action?: string | null
          notes?: string | null
          organization?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
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
      touches: {
        Row: {
          channel: string | null
          id: string
          notes: string | null
          response: string | null
          scheduled_at: string | null
          sent_at: string | null
          sequence_id: string | null
          status: string | null
          touch_num: number
        }
        Insert: {
          channel?: string | null
          id?: string
          notes?: string | null
          response?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sequence_id?: string | null
          status?: string | null
          touch_num: number
        }
        Update: {
          channel?: string | null
          id?: string
          notes?: string | null
          response?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          sequence_id?: string | null
          status?: string | null
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
      increment_page_view: {
        Args: { page_slug: string }
        Returns: void
      }
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
  T extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[T] extends { Row: infer R } ? R : never

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Insert: infer I } ? I : never

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Update: infer U } ? U : never
