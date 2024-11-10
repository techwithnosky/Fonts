// serverlessFunction.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: '0f2a6d98b342f8dec1874769618fae03-us13',
  server: 'us13'
});

export async function handler(request, response) {
  const { name, country } = request.body;

  const audienceId = 'fab6eda132';

  try {
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: 'emmynosky424@gmail.com',
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
        COUNTRY: country
      }
    });

    response.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Error submitting form' });
  }
}
