// "use client";

import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import type * as React from 'react';
import CustomFont from '@/email-helpers/custom-font';
import {
  button,
  container,
  content,
  heading,
  hr,
  main,
  paragraph,
} from '@/email-helpers/email-styles';

interface ContactUsProps {
  username: string;
  isArabic: boolean;
}

const ContactUs: React.FC<Readonly<ContactUsProps>> = ({
  username = 'Omar Aljundi',
  isArabic = true,
}): React.ReactNode => {
  return (
    <Html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'}>
      <Head>
        <CustomFont
          fontFamily="Lato"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body
        style={{
          ...main,
          fontFamily: 'Marcellus',
          direction: isArabic ? 'rtl' : 'ltr',
          textAlign: isArabic ? 'right' : 'left',
        }}
      >
        <Container style={container}>
          <Img
            src={
              isArabic
                ? `${process.env.NEXT_PUBLIC_APP_URL}/arabic-logo.png`
                : `${process.env.NEXT_PUBLIC_APP_URL}/english-logo.png`
            }
            width="158"
            height="28"
            alt="Ghodwa"
            style={{ margin: 'auto' }}
          />
          <Section style={content}>
            <Text style={heading}>
              {isArabic ? 'شكراً لتواصلك معنا!' : 'Thank You for Reaching Out!'}
            </Text>
            <Text style={paragraph}>{isArabic ? `عزيزي ${username}،` : `Dear ${username},`}</Text>
            <Text style={paragraph}>
              {isArabic
                ? 'شكراً لتواصلك معنا! لقد استلمنا رسالتك وسنعود إليك في أقرب وقت ممكن.'
                : 'Thank you for getting in touch with us! We have received your message and will be getting back to you as soon as possible.'}
            </Text>
            <Section style={hr} />
            <Text style={paragraph}>{isArabic ? 'أطيب التحيات،' : 'Warm regards,'}</Text>
            <Text style={paragraph}>{isArabic ? 'مجموعة الغدوة' : 'Alghodwa Group'}</Text>
            <a style={button} href={process.env.NEXT_PUBLIC_APP_URL}>
              {isArabic ? 'زيارة موقعنا' : 'Visit Our Website'}
            </a>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactUs;
