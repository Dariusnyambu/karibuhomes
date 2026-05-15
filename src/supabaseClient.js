import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lzefytjoeuimknszvreg.supabase.co'
const supabaseAnonKey = 'sb_publishable_WUSz4pz35S1fExQGpLYKaw_fc99J11l'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)