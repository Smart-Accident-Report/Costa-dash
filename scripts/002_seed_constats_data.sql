-- Insert sample constat data for analytics
INSERT INTO public.constats (constat_number, status, accident_date, location, region, car_brand, accident_cause, damage_amount) VALUES
-- January 2024
('CNS-2024-001', 'validated', '2024-01-15 10:30:00+00', 'Avenue Hassan II, Casablanca', 'Casablanca-Settat', 'Renault', 'Rear-end collision', 15000.00),
('CNS-2024-002', 'validated', '2024-01-18 14:45:00+00', 'Boulevard Mohammed V, Rabat', 'Rabat-Salé-Kénitra', 'Peugeot', 'Side impact', 22000.00),
('CNS-2024-003', 'pending', '2024-01-22 09:15:00+00', 'Route de Fès, Meknès', 'Fès-Meknès', 'Dacia', 'Intersection collision', 8500.00),
('CNS-2024-004', 'validated', '2024-01-25 16:20:00+00', 'Avenue Mohammed VI, Marrakech', 'Marrakech-Safi', 'Toyota', 'Lane change accident', 12000.00),

-- February 2024
('CNS-2024-005', 'validated', '2024-02-03 11:00:00+00', 'Boulevard Zerktouni, Casablanca', 'Casablanca-Settat', 'Volkswagen', 'Parking lot collision', 5500.00),
('CNS-2024-006', 'validated', '2024-02-08 13:30:00+00', 'Avenue des FAR, Rabat', 'Rabat-Salé-Kénitra', 'Renault', 'Weather-related accident', 18000.00),
('CNS-2024-007', 'rejected', '2024-02-12 15:45:00+00', 'Route de Tanger, Tétouan', 'Tanger-Tétouan-Al Hoceïma', 'Ford', 'Mechanical failure', 25000.00),
('CNS-2024-008', 'validated', '2024-02-20 08:30:00+00', 'Avenue Hassan II, Agadir', 'Souss-Massa', 'Hyundai', 'Distracted driving', 9800.00),

-- March 2024
('CNS-2024-009', 'validated', '2024-03-05 12:15:00+00', 'Boulevard Mohammed V, Oujda', 'Oriental', 'Peugeot', 'Speeding', 16500.00),
('CNS-2024-010', 'pending', '2024-03-10 17:00:00+00', 'Avenue Allal Ben Abdellah, Rabat', 'Rabat-Salé-Kénitra', 'Dacia', 'Rear-end collision', 7200.00),
('CNS-2024-011', 'validated', '2024-03-15 10:45:00+00', 'Route de Casablanca, Settat', 'Casablanca-Settat', 'Toyota', 'Side impact', 13500.00),
('CNS-2024-012', 'validated', '2024-03-22 14:20:00+00', 'Avenue Mohammed VI, Marrakech', 'Marrakech-Safi', 'Renault', 'Intersection collision', 11000.00),

-- April 2024
('CNS-2024-013', 'validated', '2024-04-02 09:30:00+00', 'Boulevard Anfa, Casablanca', 'Casablanca-Settat', 'Volkswagen', 'Lane change accident', 14200.00),
('CNS-2024-014', 'validated', '2024-04-08 16:15:00+00', 'Avenue Hassan II, Fès', 'Fès-Meknès', 'Ford', 'Distracted driving', 19500.00),
('CNS-2024-015', 'pending', '2024-04-12 11:45:00+00', 'Route de Rabat, Salé', 'Rabat-Salé-Kénitra', 'Hyundai', 'Weather-related accident', 6800.00),
('CNS-2024-016', 'validated', '2024-04-18 13:00:00+00', 'Avenue Mohammed V, Tanger', 'Tanger-Tétouan-Al Hoceïma', 'Peugeot', 'Rear-end collision', 10500.00),

-- May 2024
('CNS-2024-017', 'validated', '2024-05-03 15:30:00+00', 'Boulevard Zerktouni, Casablanca', 'Casablanca-Settat', 'Dacia', 'Parking lot collision', 4500.00),
('CNS-2024-018', 'validated', '2024-05-10 08:45:00+00', 'Avenue des FAR, Rabat', 'Rabat-Salé-Kénitra', 'Toyota', 'Side impact', 17800.00),
('CNS-2024-019', 'validated', '2024-05-15 12:30:00+00', 'Route de Meknès, Fès', 'Fès-Meknès', 'Renault', 'Speeding', 21000.00),
('CNS-2024-020', 'pending', '2024-05-22 14:15:00+00', 'Avenue Hassan II, Agadir', 'Souss-Massa', 'Volkswagen', 'Mechanical failure', 8900.00),

-- June 2024
('CNS-2024-021', 'validated', '2024-06-05 10:00:00+00', 'Boulevard Mohammed VI, Marrakech', 'Marrakech-Safi', 'Ford', 'Intersection collision', 15800.00),
('CNS-2024-022', 'validated', '2024-06-12 16:45:00+00', 'Avenue Mohammed V, Oujda', 'Oriental', 'Hyundai', 'Lane change accident', 12500.00),
('CNS-2024-023', 'rejected', '2024-06-18 09:20:00+00', 'Route de Tanger, Tétouan', 'Tanger-Tétouan-Al Hoceïma', 'Peugeot', 'Distracted driving', 7600.00),
('CNS-2024-024', 'validated', '2024-06-25 13:40:00+00', 'Avenue Hassan II, Casablanca', 'Casablanca-Settat', 'Dacia', 'Weather-related accident', 11200.00),

-- July 2024
('CNS-2024-025', 'validated', '2024-07-08 11:15:00+00', 'Boulevard Anfa, Casablanca', 'Casablanca-Settat', 'Toyota', 'Rear-end collision', 16200.00),
('CNS-2024-026', 'pending', '2024-07-15 14:30:00+00', 'Avenue Allal Ben Abdellah, Rabat', 'Rabat-Salé-Kénitra', 'Renault', 'Side impact', 9400.00),
('CNS-2024-027', 'validated', '2024-07-20 08:50:00+00', 'Route de Casablanca, Settat', 'Casablanca-Settat', 'Volkswagen', 'Speeding', 18700.00),
('CNS-2024-028', 'validated', '2024-07-28 15:10:00+00', 'Avenue Mohammed VI, Marrakech', 'Marrakech-Safi', 'Ford', 'Parking lot collision', 5200.00),

-- August 2024
('CNS-2024-029', 'validated', '2024-08-02 12:45:00+00', 'Avenue Hassan II, Fès', 'Fès-Meknès', 'Hyundai', 'Mechanical failure', 23500.00),
('CNS-2024-030', 'validated', '2024-08-10 16:20:00+00', 'Boulevard Mohammed V, Tanger', 'Tanger-Tétouan-Al Hoceïma', 'Peugeot', 'Intersection collision', 13800.00),
('CNS-2024-031', 'pending', '2024-08-18 10:35:00+00', 'Route de Rabat, Salé', 'Rabat-Salé-Kénitra', 'Dacia', 'Lane change accident', 8100.00),
('CNS-2024-032', 'validated', '2024-08-25 14:55:00+00', 'Avenue Hassan II, Agadir', 'Souss-Massa', 'Toyota', 'Distracted driving', 14600.00),

-- September 2024
('CNS-2024-033', 'validated', '2024-09-05 09:25:00+00', 'Boulevard Zerktouni, Casablanca', 'Casablanca-Settat', 'Renault', 'Weather-related accident', 19200.00),
('CNS-2024-034', 'validated', '2024-09-12 13:15:00+00', 'Avenue des FAR, Rabat', 'Rabat-Salé-Kénitra', 'Volkswagen', 'Rear-end collision', 11800.00),
('CNS-2024-035', 'rejected', '2024-09-20 15:40:00+00', 'Avenue Mohammed V, Oujda', 'Oriental', 'Ford', 'Side impact', 6900.00),
('CNS-2024-036', 'validated', '2024-09-28 11:05:00+00', 'Route de Meknès, Fès', 'Fès-Meknès', 'Hyundai', 'Speeding', 17400.00),

-- October 2024
('CNS-2024-037', 'validated', '2024-10-03 14:20:00+00', 'Boulevard Mohammed VI, Marrakech', 'Marrakech-Safi', 'Peugeot', 'Parking lot collision', 4800.00),
('CNS-2024-038', 'pending', '2024-10-10 08:40:00+00', 'Avenue Mohammed V, Tanger', 'Tanger-Tétouan-Al Hoceïma', 'Dacia', 'Mechanical failure', 22100.00),
('CNS-2024-039', 'validated', '2024-10-18 16:30:00+00', 'Route de Tanger, Tétouan', 'Tanger-Tétouan-Al Hoceïma', 'Toyota', 'Intersection collision', 15300.00),
('CNS-2024-040', 'validated', '2024-10-25 12:50:00+00', 'Avenue Hassan II, Casablanca', 'Casablanca-Settat', 'Renault', 'Lane change accident', 13100.00),

-- November 2024
('CNS-2024-041', 'validated', '2024-11-02 10:15:00+00', 'Boulevard Anfa, Casablanca', 'Casablanca-Settat', 'Volkswagen', 'Distracted driving', 16800.00),
('CNS-2024-042', 'validated', '2024-11-08 15:25:00+00', 'Avenue Allal Ben Abdellah, Rabat', 'Rabat-Salé-Kénitra', 'Ford', 'Weather-related accident', 9600.00),
('CNS-2024-043', 'pending', '2024-11-15 09:45:00+00', 'Route de Casablanca, Settat', 'Casablanca-Settat', 'Hyundai', 'Rear-end collision', 7800.00),
('CNS-2024-044', 'validated', '2024-11-22 13:35:00+00', 'Avenue Hassan II, Fès', 'Fès-Meknès', 'Peugeot', 'Side impact', 18900.00),

-- December 2024
('CNS-2024-045', 'validated', '2024-12-05 11:20:00+00', 'Avenue Hassan II, Agadir', 'Souss-Massa', 'Dacia', 'Speeding', 20500.00),
('CNS-2024-046', 'validated', '2024-12-12 14:10:00+00', 'Boulevard Mohammed V, Oujda', 'Oriental', 'Toyota', 'Parking lot collision', 5900.00),
('CNS-2024-047', 'rejected', '2024-12-18 16:55:00+00', 'Avenue Mohammed VI, Marrakech', 'Marrakech-Safi', 'Renault', 'Mechanical failure', 24200.00),
('CNS-2024-048', 'pending', '2024-12-28 10:30:00+00', 'Boulevard Zerktouni, Casablanca', 'Casablanca-Settat', 'Volkswagen', 'Intersection collision', 12700.00);
