-- Create workers table for dépannage workers
CREATE TABLE IF NOT EXISTS workers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    role VARCHAR(100) NOT NULL, -- tow truck, mechanic, emergency support, etc.
    specialty TEXT,
    work_schedule VARCHAR(50) DEFAULT 'day', -- day, night, 24h, custom
    custom_hours JSONB, -- for custom schedule: {"start": "08:00", "end": "17:00"}
    base_location_address TEXT,
    base_location_lat DECIMAL(10, 8),
    base_location_lng DECIMAL(11, 8),
    base_location_city VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Create worker availability tracking table
CREATE TABLE IF NOT EXISTS worker_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'off_duty', -- available, busy, off_duty
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    current_location_address TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID, -- who updated the status (worker or admin)
    notes TEXT
);

-- Create worker assignments table to track constat assignments
CREATE TABLE IF NOT EXISTS worker_assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    constat_id UUID NOT NULL REFERENCES constats(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'assigned', -- assigned, in_progress, completed, cancelled
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    UNIQUE(constat_id) -- one worker per constat
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workers_agency_id ON workers(agency_id);
CREATE INDEX IF NOT EXISTS idx_workers_role ON workers(role);
CREATE INDEX IF NOT EXISTS idx_workers_active ON workers(is_active);
CREATE INDEX IF NOT EXISTS idx_worker_availability_worker_id ON worker_availability(worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_availability_status ON worker_availability(status);
CREATE INDEX IF NOT EXISTS idx_worker_assignments_worker_id ON worker_assignments(worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_assignments_constat_id ON worker_assignments(constat_id);
CREATE INDEX IF NOT EXISTS idx_worker_assignments_status ON worker_assignments(status);

-- Create function to update worker availability timestamp
CREATE OR REPLACE FUNCTION update_worker_availability_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update timestamp
CREATE TRIGGER trigger_update_worker_availability_timestamp
    BEFORE UPDATE ON worker_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_worker_availability_timestamp();

-- Create function to update workers updated_at timestamp
CREATE OR REPLACE FUNCTION update_workers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update timestamp
CREATE TRIGGER trigger_update_workers_timestamp
    BEFORE UPDATE ON workers
    FOR EACH ROW
    EXECUTE FUNCTION update_workers_timestamp();
