-- Create constats (accident reports) table
CREATE TABLE IF NOT EXISTS public.constats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  constat_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected')),
  accident_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  region VARCHAR(100) NOT NULL,
  car_brand VARCHAR(100) NOT NULL,
  accident_cause TEXT NOT NULL,
  damage_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_constats_status ON public.constats(status);
CREATE INDEX IF NOT EXISTS idx_constats_region ON public.constats(region);
CREATE INDEX IF NOT EXISTS idx_constats_accident_date ON public.constats(accident_date);
CREATE INDEX IF NOT EXISTS idx_constats_car_brand ON public.constats(car_brand);

-- Enable Row Level Security
ALTER TABLE public.constats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all users to view constats" ON public.constats FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert constats" ON public.constats FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow users to update their own constats" ON public.constats FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Allow users to delete their own constats" ON public.constats FOR DELETE USING (auth.uid() = created_by);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_constats_updated_at BEFORE UPDATE ON public.constats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
