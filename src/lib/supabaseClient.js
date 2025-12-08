import { createClient } from "@supabase/supabase-js";

// Supabase keys are read from Vite env variables.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env (see SUPABASE_SETUP.md).
const SUPABASE_URL = "https://sunipfnesvzlkcitbhns.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1bmlwZm5lc3Z6bGtjaXRiaG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNjAwNDAsImV4cCI6MjA4MDczNjA0MH0.8I-o1zjwti1fUsla9bwVQLSoZq7To8LhP0V652ZnGn0";

// Development guard: surface a clear console message when env vars are missing
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
// if (!isSupabaseConfigured && import.meta.env.DEV) {
//   console.warn(
//     "Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env and restart the dev server. See SUPABASE_SETUP.md"
//   );
// }
let supabase;

if (isSupabaseConfigured) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
} else {
  // graceful stub to avoid hard runtime errors when env vars are missing in dev
  const missingError = new Error(
    "Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env and restart the dev server"
  );

  // create a chainable, thenable stub that mimics supabase query builder
  const makeStubQuery = () => {
    const result = { data: null, error: missingError };
    const q = {
      select: () => q,
      insert: () => q,
      update: () => q,
      delete: () => q,
      upsert: () => q,
      eq: () => q,
      order: () => q,
      limit: () => q,
      single: () => q,
      // make the stub awaitable (thenable)
      then: (resolve) => Promise.resolve(result).then(resolve),
      catch: () => q,
    };
    return q;
  };

  const stubFrom = () => makeStubQuery();

  const stubStorage = {
    from: () => ({
      upload: async () => ({ data: null, error: missingError }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    }),
  };

  supabase = {
    from: stubFrom,
    storage: stubStorage,
    auth: {
      signIn: async () => ({ data: null, error: missingError }),
      signUp: async () => ({ data: null, error: missingError }),
    },
  };
}

export { isSupabaseConfigured };
export { supabase };
export default supabase;
