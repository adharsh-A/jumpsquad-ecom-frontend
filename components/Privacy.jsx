import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.date}>Last Updated: January 1, 2024</p>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Introduction</h2>
        <p style={styles.text}>
          Welcome to <strong>JUMPSQUAD</strong>, an e-commerce platform committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website <strong>[website name]</strong>.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Information We Collect</h2>
        <p style={styles.text}>
          <strong>a. Personal Information:</strong> When you create an account, make a purchase, or contact us, we collect information like your name, email address, shipping address, and payment details.
        </p>
        <p style={styles.text}>
          <strong>b. Non-Personal Information:</strong> This includes details like browser type, device type, and browsing behavior.
        </p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. How We Use Your Information</h2>
        <p style={styles.text}>
          We use your personal information to:
          <ul style={styles.list}>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you regarding your purchases</li>
            <li>Improve our services and website</li>
            <li>Send you promotional offers and updates</li>
          </ul>
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. Sharing Your Information</h2>
        <p style={styles.text}>
          We do not sell, rent, or share your personal information with third parties, except in the following cases:
        </p>
        <ul style={styles.list}>
          <li>With service providers (e.g., shipping companies, payment processors) to fulfill your orders</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Cookies and Tracking Technologies</h2>
        <p style={styles.text}>
          Our website uses cookies and similar technologies to enhance your experience. You can manage cookies through your browser settings.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>6. Security</h2>
        <p style={styles.text}>
          We implement reasonable security measures to protect your personal information. However, no data transmission over the Internet can be guaranteed to be 100% secure.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>7. Your Rights</h2>
        <p style={styles.text}>
          You have the right to:
        </p>
        <ul style={styles.list}>
          <li>Access, update, or delete your personal data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>8. Changes to This Policy</h2>
        <p style={styles.text}>
          We may update this Privacy Policy from time to time. Please review it periodically.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>9. Contact Us</h2>
        <p style={styles.text}>
          If you have any questions or concerns regarding this Privacy Policy, contact us at <strong>[contact email]</strong>.
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

export default PrivacyPolicy;
