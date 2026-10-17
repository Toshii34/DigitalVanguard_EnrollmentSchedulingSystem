body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #2b2b2b;
  color: #333;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10000;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.navbar-brand img {
  height: 40px;
}

.navbar-brand span {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.navbar-brand span small {
  font-size: 0.7rem;
  color: #666;
  font-weight: normal;
}

.btn-nav-group {
  display: flex;
  gap: 10px;
}

.btn-login-nav {
  border: 1px solid #198754;
  color: #198754;
  background: transparent;
  border-radius: 5px;
  padding: 5px 15px;
  font-weight: 500;
}

.btn-login-nav:hover {
  background-color: #198754;
  color: #fff;
}

.hero-section {
  position: relative;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.btn-enroll-hero {
  background-color: #198754;
  color: #fff;
  font-size: 1.2rem;
  padding: 12px 30px;
  border-radius: 5px;
  border: none;
  font-weight: 600;
}

.btn-enroll-hero:hover {
  background-color: #157347;
}

.about-section,
.jhs-section,
.strands-section {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: 80px 0;
}

.about-section {
  background: linear-gradient(to bottom, rgba(0, 40, 20, 0.8), rgba(0, 40, 20, 0.9));
}

.about-bg,
.strands-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(8px) brightness(0.4);
  z-index: 0;
}

.about-section .container,
.jhs-section .container,
.strands-section .container {
  position: relative;
  z-index: 1;
}

.about-section h2,
.jhs-section h2,
.strands-section h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
}

.about-section p,
.jhs-subtitle,
.strand-subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 900px;
  margin: 0 auto 60px;
  text-align: center;
}

.info-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.info-card {
  background-color: #1a3c34;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.info-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #e0e0e0;
  letter-spacing: 1px;
}

.info-card p,
.info-card ul {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #d1d1d1;
  margin: 0;
  text-align: left;
}

.info-card ul {
  padding-left: 20px;
}

.jhs-section {
  background: linear-gradient(to bottom, rgba(20, 30, 45, 0.95), rgba(15, 25, 35, 0.98));
}

.jhs-card {
  background-color: #1a2e3d;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border-left: 5px solid #f0ad4e;
  max-width: 900px;
  margin: 0 auto;
}

.jhs-card h3 {
  color: #f0ad4e;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 15px;
}

.jhs-card p,
.jhs-card ul {
  font-size: 0.95rem;
  color: #d1d1d1;
  line-height: 1.7;
}

.events-section {
  background: linear-gradient(135deg, #e8f4f8 0%, #f5e6f0 100%);
  color: #333;
  padding: 70px 0 80px;
}

.events-section h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 40px;
  text-align: center;
  color: #2c3e50;
}

.events-carousel-wrap {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 60px;
}

.events-carousel-bg {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #7fb3d5 0%, #b19cd9 100%);
  filter: blur(40px);
  opacity: 0.6;
}

.events-carousel-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 520px;
}

.event-slide {
  display: none;
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  background-color: #fff;
}

.event-slide.active {
  display: block;
}

.event-slide img {
  width: 100%;
  display: block;
}

.event-caption {
  padding: 14px 18px;
  background-color: #1a4d3e;
  color: #fff;
}

.event-caption h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 4px;
}

.event-caption p {
  font-size: 0.78rem;
  color: #c9e4d5;
  margin: 0;
}

.event-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.event-nav-btn.prev { left: 0; }
.event-nav-btn.next { right: 0; }

.event-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.event-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #c9d6df;
  border: none;
  padding: 0;
}

.event-dot.active {
  background-color: #1a4d3e;
  transform: scale(1.2);
}

.strands-section {
  background: linear-gradient(to bottom, rgba(0, 40, 20, 0.95), rgba(0, 30, 15, 0.98));
}

.strand-group {
  max-width: 1100px;
  margin: 0 auto 40px;
}

.strand-group h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #198754;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
}

.strand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.strand-card {
  background-color: #1a3c34;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border-left: 4px solid #198754;
}

.strand-card h4 {
  font-size: 1.3rem;
  font-weight: 800;
  margin: 12px 0 10px;
  color: #fff;
}

.strand-card p {
  font-size: 0.85rem;
  color: #c9c9c9;
  line-height: 1.5;
  margin: 0;
}

.strand-tag {
  display: inline-block;
  background-color: #198754;
  color: #fff;
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.login-section {
  display: none;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  background-image: url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
}

.login-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.login-card {
  position: relative;
  z-index: 1;
  background: #fff;
  padding: 40px;
  border-radius: 15px;
  width: min(450px, calc(100% - 32px));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #198754;
  margin-bottom: 15px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 5px;
}

.login-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 30px;
}

.form-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #444;
  text-align: left;
  display: block;
}

.form-control,
.form-select,
.form-control-sm {
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
}

.btn-login-main,
.btn-enroll-main,
.btn-assign-confirm,
.btn-save-draft,
.btn-schedule,
.btn-submit-enrollment,
.btn-outline-secondary,
.btn {
  transition: 0.2s ease;
}

.btn-login-main {
  background-color: #198754;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  margin-bottom: 15px;
}

.btn-login-main:hover {
  background-color: #157347;
}

.btn-enroll-main {
  background-color: #fff;
  color: #198754;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #198754;
  font-weight: 700;
  margin-bottom: 20px;
}

.btn-enroll-main:hover {
  background-color: #f0fdf4;
}

.forgot-password {
  font-size: 0.85rem;
  color: #666;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .form-control {
  padding-right: 45px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

.login-back-btn,
.section-back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #198754;
  border: 2px solid #198754;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  z-index: 100;
}

.admin-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 30000;
  justify-content: center;
  align-items: center;
}

.admin-modal-overlay.active {
  display: flex;
}

.admin-modal {
  background-color: white;
  border-radius: 10px;
  width: min(500px, calc(100% - 24px));
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.admin-modal-header {
  background-color: #1a4d3e;
  color: white;
  padding: 18px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-modal-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.admin-modal-close {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
}

.admin-modal-body {
  padding: 25px;
}

.form-label-sm {
  font-size: 0.82rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  display: block;
}

.req {
  color: #dc3545;
}

.enrollment-section {
  display: none;
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  z-index: 9998;
  overflow-y: auto;
  padding: 100px 0 40px;
}

.enrollment-container {
  background-color: #fff;
  width: min(900px, calc(100% - 24px));
  margin: 0 auto;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.enrollment-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.enrollment-header h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #198754;
  margin: 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-top: 20px;
  margin-bottom: 15px;
  border-bottom: 2px solid #198754;
  padding-bottom: 5px;
  display: inline-block;
}

.account-section {
  background-color: #f0fdf4;
  border: 1px solid #198754;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.enrollment-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-save-draft,
.btn-schedule,
.btn-submit-enrollment,
.btn-assign-confirm {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid transparent;
}

.btn-save-draft {
  background-color: white;
  color: #333;
  border-color: #ccc;
}

.btn-schedule {
  background-color: white;
  color: #198754;
  border-color: #198754;
}

.btn-submit-enrollment,
.btn-assign-confirm {
  background-color: #198754;
  color: white;
}

.schedule-section {
  display: none;
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  z-index: 9998;
  padding: 100px 0 40px;
}

.schedule-container {
  width: min(1100px, calc(100% - 24px));
  margin: 0 auto;
}

.schedule-header {
  color: white;
  margin-bottom: 20px;
}

.schedule-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.calendar-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.calendar-nav {
  display: flex;
  gap: 5px;
}

.calendar-nav button {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.calendar-day-header,
.calendar-day {
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
}

.calendar-day-header {
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
}

.calendar-day {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.calendar-day.empty {
  border: none;
  background: transparent;
  cursor: default;
}

.calendar-day .day-number {
  font-weight: 700;
  font-size: 0.9rem;
}

.calendar-day .day-status {
  font-size: 0.6rem;
  margin-top: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #d1e7dd;
  color: #0f5132;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .about-section h2,
  .jhs-section h2,
  .strands-section h2 {
    font-size: 2.2rem;
  }

  .enrollment-footer {
    flex-direction: column;
  }

  .enrollment-footer .btn,
  .btn-submit-enrollment,
  .btn-save-draft,
  .btn-schedule {
    width: 100%;
  }
}
