-- Create vehicles table for troubleshooting vehicles
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vehicle_type VARCHAR(100) DEFAULT 'tow_truck', -- tow_truck, service_van, emergency_vehicle
    license_plate VARCHAR(20),
    location VARCHAR(255) NOT NULL,
    work_time VARCHAR(50) NOT NULL, -- day, night, 24h, custom
    custom_hours JSONB, -- for custom schedule: {"start": "08:00", "end": "17:00"}
    status VARCHAR(20) DEFAULT 'active', -- active, maintenance, out_of_service
    assigned_worker_id UUID REFERENCES workers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    is_active BOOLEAN DEFAULT true
);

-- Create vehicle maintenance log table
CREATE TABLE IF NOT EXISTS vehicle_maintenance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    maintenance_type VARCHAR(100) NOT NULL, -- routine, repair, inspection
    description TEXT,
    cost DECIMAL(10, 2),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    performed_by UUID,
    next_maintenance_date DATE,
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON vehicles(location);
CREATE INDEX IF NOT EXISTS idx_vehicles_work_time ON vehicles(work_time);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_active ON vehicles(is_active);
CREATE INDEX IF NOT EXISTS idx_vehicles_assigned_worker ON vehicles(assigned_worker_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_maintenance_vehicle_id ON vehicle_maintenance(vehicle_id);

-- Create function to update vehicles timestamp
CREATE OR REPLACE FUNCTION update_vehicles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update timestamp
CREATE TRIGGER trigger_update_vehicles_timestamp
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_vehicles_timestamp();
