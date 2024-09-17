import React from 'react';

const TermsOfService = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms of Service</h1>
      <p style={styles.date}>Last Updated: January 1, 2024</p>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Acceptance of Terms</h2>
        <p style={styles.text}>
          By accessing and using <strong>Jumpsquad</strong> ("we", "our", "us"), you agree to comply with these Terms of Service. If you do not agree, you may not access or use our website.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Eligibility</h2>
        <p style={styles.text}>
          You must be at least <strong>18</strong> years old to use our services. By using our services, you represent that you meet this age requirement.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. Account Registration</h2>
        <p style={styles.text}>
          To use certain features of our website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account details and for all activities under your account.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. User Responsibilities</h2>
        <p style={styles.text}>
          As a user of our platform, you agree not to:
        </p>
        <ul style={styles.list}>
          <li>Violate any laws or regulations</li>
          <li>Post false or misleading information</li>
          <li>Engage in harmful or abusive behavior</li>
          <li>Use automated systems to access our website (e.g., bots)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Purchases and Payment</h2>
        <p style={styles.text}>
          All purchases made through our website are subject to availability and acceptance. Prices and terms of sale may change at any time. Payment details must be accurate and up to date.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>6. Returns and Refunds</h2>
        <p style={styles.text}>
          Please refer to our separate <strong>[Return and Refund Policy]</strong> for details on returns and refunds.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>7. Intellectual Property</h2>
        <p style={styles.text}>
          All content on our website, including but not limited to text, graphics, logos, and software, is the property of <strong>Jumpsquad</strong> and is protected by applicable intellectual property laws.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>8. Limitation of Liability</h2>
        <p style={styles.text}>
          We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our services.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>9. Changes to Terms</h2>
        <p style={styles.text}>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting on this page. Please check this page regularly for updates.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>10. Governing Law</h2>
        <p style={styles.text}>
          These terms are governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>11. Contact Us</h2>
        <p style={styles.text}>
          For any questions regarding these Terms of Service, please contact us at <strong>admin@jumpsquad.com</strong>.
        </p>
      </section>
    </div>
  );
};

// Styling for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: 'whitesmoke',
  },
  heading: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'wheat',
  },
  date: {
    textAlign: 'center',
    color: 'gray',
    fontSize: '14px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  subHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'wheat',
  },
  text: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  list: {
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
};

export default TermsOfService;
