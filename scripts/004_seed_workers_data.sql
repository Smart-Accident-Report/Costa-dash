-- Insert sample agencies (assuming we need some for testing)
INSERT INTO agencies (id, name, code, contact_email, contact_phone, address, city, region, subscription_plan, max_workers, is_active)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'Costa Dépannage Paris', 'COSTA-PAR', 'admin@costa-paris.fr', '+33 1 23 45 67 89', '123 Rue de Rivoli', 'Paris', 'Île-de-France', 'premium', 50, true),
    ('550e8400-e29b-41d4-a716-446655440002', 'Costa Dépannage Lyon', 'COSTA-LYN', 'admin@costa-lyon.fr', '+33 4 78 90 12 34', '456 Cours Lafayette', 'Lyon', 'Auvergne-Rhône-Alpes', 'standard', 25, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample workers
INSERT INTO workers (id, agency_id, full_name, phone_number, email, role, specialty, work_schedule, base_location_address, base_location_lat, base_location_lng, base_location_city)
VALUES 
    -- Paris workers
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Jean Dupont', '+33 6 12 34 56 78', 'jean.dupont@costa-paris.fr', 'Tow Truck Driver', 'Heavy vehicle towing', 'day', '123 Rue de Rivoli, Paris', 48.8566, 2.3522, 'Paris'),
    ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Marie Martin', '+33 6 23 45 67 89', 'marie.martin@costa-paris.fr', 'Mechanic', 'Engine diagnostics', 'night', '123 Rue de Rivoli, Paris', 48.8566, 2.3522, 'Paris'),
    ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Pierre Moreau', '+33 6 34 56 78 90', 'pierre.moreau@costa-paris.fr', 'Emergency Support', 'First aid certified', '24h', '123 Rue de Rivoli, Paris', 48.8566, 2.3522, 'Paris'),
    ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Sophie Bernard', '+33 6 45 67 89 01', 'sophie.bernard@costa-paris.fr', 'Tow Truck Driver', 'Light vehicle towing', 'day', '123 Rue de Rivoli, Paris', 48.8566, 2.3522, 'Paris'),
    
    -- Lyon workers
    ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Luc Dubois', '+33 6 56 78 90 12', 'luc.dubois@costa-lyon.fr', 'Tow Truck Driver', 'Motorcycle towing', 'day', '456 Cours Lafayette, Lyon', 45.7640, 4.8357, 'Lyon'),
    ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Camille Rousseau', '+33 6 67 89 01 23', 'camille.rousseau@costa-lyon.fr', 'Mechanic', 'Electrical systems', 'night', '456 Cours Lafayette, Lyon', 45.7640, 4.8357, 'Lyon'),
    ('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Thomas Leroy', '+33 6 78 90 12 34', 'thomas.leroy@costa-lyon.fr', 'Emergency Support', 'Traffic management', '24h', '456 Cours Lafayette, Lyon', 45.7640, 4.8357, 'Lyon');

-- Insert initial availability status for all workers
INSERT INTO worker_availability (worker_id, status, current_location_lat, current_location_lng, current_location_address, notes)
VALUES 
    ('660e8400-e29b-41d4-a716-446655440001', 'available', 48.8566, 2.3522, '123 Rue de Rivoli, Paris', 'Ready for assignments'),
    ('660e8400-e29b-41d4-a716-446655440002', 'off_duty', 48.8566, 2.3522, '123 Rue de Rivoli, Paris', 'Night shift starts at 20:00'),
    ('660e8400-e29b-41d4-a716-446655440003', 'available', 48.8566, 2.3522, '123 Rue de Rivoli, Paris', '24h availability'),
    ('660e8400-e29b-41d4-a716-446655440004', 'busy', 48.8656, 2.3412, 'Avenue des Champs-Élysées, Paris', 'Currently on mission'),
    ('660e8400-e29b-41d4-a716-446655440005', 'available', 45.7640, 4.8357, '456 Cours Lafayette, Lyon', 'Ready for assignments'),
    ('660e8400-e29b-41d4-a716-446655440006', 'off_duty', 45.7640, 4.8357, '456 Cours Lafayette, Lyon', 'Night shift starts at 22:00'),
    ('660e8400-e29b-41d4-a716-446655440007', 'available', 45.7640, 4.8357, '456 Cours Lafayette, Lyon', '24h emergency support');

-- Insert some sample assignments (linking to existing constats)
INSERT INTO worker_assignments (worker_id, constat_id, assigned_by, status, started_at, notes)
SELECT 
    '660e8400-e29b-41d4-a716-446655440004',
    c.id,
    '550e8400-e29b-41d4-a716-446655440001', -- agency admin
    'in_progress',
    NOW() - INTERVAL '2 hours',
    'Towing vehicle from accident scene'
FROM constats c 
WHERE c.status = 'pending' 
LIMIT 1;
