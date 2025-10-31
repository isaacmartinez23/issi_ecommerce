// /js/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Pega tu URL y tu llave 'anon' aquí
const supabaseUrl = 'https://rzjrrmaigyhcegasryas.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6anJybWFpZ3loY2VnYXNyeWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NzA3NzIsImV4cCI6MjA3NzQ0Njc3Mn0.ahS3DKVvxPTYfoqW_-nn-RHc2b7rmEtARmHqhMvbTe0';

// Exporta el cliente
export const supabase = createClient(supabaseUrl, supabaseKey);