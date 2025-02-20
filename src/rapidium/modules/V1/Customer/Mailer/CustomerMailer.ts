import MyMailer from '@rapCoreBase/Mailer/MyMailer';
import EmailTemplate from '@rapCoreBase/Mailer/EmailTemplate';
const environment = process.env;

/**
 * class CustomerMailer
 */
export default class CustomerMailer extends MyMailer {
  /**
   *
   * @param {mailObject} mailObject
   */
  async reminderToCompleteIntakeAndSymptomEmail(mailObject: any) {
    const emailTemplate = await new EmailTemplate().getEmailTemplateFromDBName(
        'reminder_to_complete_pre_appointment_steps',
    );

    if (emailTemplate) {
      let htmlText = '';
      const siteUrl: string = environment.web_base_url ?
        environment.web_base_url :
        '';
      const apiUrl = environment.api_base_url;

      const logo = apiUrl + 'uploads/logos/logo.png';
      const fbIcon = apiUrl + 'uploads/logos/facebook.png';
      const instagramIcon = apiUrl + 'uploads/logos/instagram.png';
      const linkedinIcon = apiUrl + 'uploads/logos/linkedIn.png';

      const url = environment.pwa_base_url + 'home/';
      emailTemplate.body = emailTemplate.body.replace('{{site_url}}', siteUrl);
      emailTemplate.body = emailTemplate.body.replace('{{logo}}', logo);
      emailTemplate.body = emailTemplate.body.replace('{{fb_icon}}', fbIcon);
      emailTemplate.body = emailTemplate.body.replace(
          '{{instagram_icon}}',
          instagramIcon,
      );
      emailTemplate.body = emailTemplate.body.replace(
          '{{linkedin_icon}}',
          linkedinIcon,
      );
      emailTemplate.body = emailTemplate.body.replace('{{url}}', url);

      htmlText = emailTemplate.body.replace(
          '{{display_name}}',
          mailObject.displayName,
      );
      this.send({
        from: emailTemplate.from_email,
        to: mailObject.email,
        subject: emailTemplate.subject,
        html: htmlText,
      });
    }
  }
  /**
   *
   * @param {mailObject} mailObject
   */
  async reminderToBookAnAppointmentEmail(mailObject: any) {
    const emailTemplate = await new EmailTemplate().getEmailTemplateFromDBName(
        'reminder_to_book_an_appointment',
    );

    if (emailTemplate) {
      let htmlText = '';
      const siteUrl: string = environment.web_base_url ?
        environment.web_base_url :
        '';
      const apiUrl = environment.api_base_url;

      const logo = apiUrl + 'uploads/logos/logo.png';
      const fbIcon = apiUrl + 'uploads/logos/facebook.png';
      const instagramIcon = apiUrl + 'uploads/logos/instagram.png';
      const linkedinIcon = apiUrl + 'uploads/logos/linkedIn.png';

      const url = environment.pwa_base_url + 'home/';
      emailTemplate.body = emailTemplate.body.replace('{{site_url}}', siteUrl);
      emailTemplate.body = emailTemplate.body.replace('{{logo}}', logo);
      emailTemplate.body = emailTemplate.body.replace('{{fb_icon}}', fbIcon);
      emailTemplate.body = emailTemplate.body.replace(
          '{{instagram_icon}}',
          instagramIcon,
      );
      emailTemplate.body = emailTemplate.body.replace(
          '{{linkedin_icon}}',
          linkedinIcon,
      );
      emailTemplate.body = emailTemplate.body.replace('{{url}}', url);

      htmlText = emailTemplate.body.replace(
          '{{display_name}}',
          mailObject.displayName,
      );
      this.send({
        from: emailTemplate.from_email,
        to: mailObject.email,
        subject: emailTemplate.subject,
        html: htmlText,
      });
    }
  }
}
