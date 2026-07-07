// ==========================================
// SUPABASE CONFIG
// WorkSync
// ==========================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://nzzaqvylunitmrgwflxe.supabase.co";

const supabaseKey = "sb_publishable_qyp3R256ZfjacJ_VXOKijA_c84zUPtf";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
