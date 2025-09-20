-- Insert sample vehicles data
INSERT INTO vehicles (name, vehicle_type, license_plate, location, work_time, status, custom_hours) VALUES
('Dépanneuse Alpha', 'tow_truck', 'DEP-001-MA', 'Casablanca', 'day', 'active', NULL),
('Dépanneuse Beta', 'tow_truck', 'DEP-002-MA', 'Rabat', 'night', 'active', NULL),
('Dépanneuse Gamma', 'tow_truck', 'DEP-003-MA', 'Marrakech', '24h', 'active', NULL),
('Service Van Delta', 'service_van', 'SRV-001-MA', 'Fès', 'day', 'active', NULL),
('Service Van Echo', 'service_van', 'SRV-002-MA', 'Tanger', 'custom', 'active', '{"start": "06:00", "end": "14:00"}'),
('Dépanneuse Foxtrot', 'tow_truck', 'DEP-004-MA', 'Agadir', 'day', 'maintenance', NULL),
('Emergency Unit Golf', 'emergency_vehicle', 'EMG-001-MA', 'Casablanca', '24h', 'active', NULL),
('Dépanneuse Hotel', 'tow_truck', 'DEP-005-MA', 'Meknès', 'night', 'active', NULL),
('Service Van India', 'service_van', 'SRV-003-MA', 'Oujda', 'day', 'active', NULL),
('Dépanneuse Juliet', 'tow_truck', 'DEP-006-MA', 'Tétouan', 'custom', 'active', '{"start": "08:00", "end": "20:00"}'),
('Emergency Unit Kilo', 'emergency_vehicle', 'EMG-002-MA', 'Rabat', '24h', 'active', NULL),
('Dépanneuse Lima', 'tow_truck', 'DEP-007-MA', 'Salé', 'day', 'out_of_service', NULL);

-- Insert sample maintenance records
INSERT INTO vehicle_maintenance (vehicle_id, maintenance_type, description, cost, performed_at, notes) VALUES
((SELECT id FROM vehicles WHERE name = 'Dépanneuse Alpha'), 'routine', 'Oil change and tire rotation', 450.00, NOW() - INTERVAL '15 days', 'Regular maintenance completed'),
((SELECT id FROM vehicles WHERE name = 'Dépanneuse Beta'), 'repair', 'Brake system repair', 1200.00, NOW() - INTERVAL '7 days', 'Brake pads and rotors replaced'),
((SELECT id FROM vehicles WHERE name = 'Service Van Delta'), 'inspection', 'Annual safety inspection', 200.00, NOW() - INTERVAL '30 days', 'Passed inspection'),
((SELECT id FROM vehicles WHERE name = 'Dépanneuse Foxtrot'), 'repair', 'Engine diagnostic and repair', 2500.00, NOW() - INTERVAL '3 days', 'Currently in maintenance'),
((SELECT id FROM vehicles WHERE name = 'Emergency Unit Golf'), 'routine', 'Preventive maintenance', 600.00, NOW() - INTERVAL '20 days', 'All systems checked');
