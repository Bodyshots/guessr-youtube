import { createClient } from '@supabase/supabase-js'
import { env } from '@/env'


const supabaseUrl = env.DATABASE_URL ?? ''
const supabaseKey = env.DATABASE_KEY ?? ''

// Connecting to backend
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase