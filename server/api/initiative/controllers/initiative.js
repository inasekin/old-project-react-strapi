'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async support(ctx) {
    const { name, surname, email, phone, initiativeId, region } = ctx.request.body;
    const user = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      regionField: region
    };
    const isExisting = await strapi.query('supporting').findOne({ name: name, surname: surname, email: email, regionField: region });
    let initiatives;
    if (isExisting && isExisting.initiatives.every(initiative => initiative.id != initiativeId)) {
      initiatives = isExisting.initiatives.push({id: initiativeId});
    }
    let updatedRecord;
    isExisting ?
      updatedRecord = await strapi.query('supporting').update(user, isExisting) :
      updatedRecord =await strapi.query('supporting').create({...user, initiatives: [{id: initiativeId}]});
    return updatedRecord;
  },

  async sendMail(ctx) {
    const { name, mail, question } = ctx.request.body;
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'info@odobreno.team',
        from: 'info@odobreno.team',
        subject: `Запрос из формы обратной связи от ${name}`,
        text: `Вопрос: ${question}
        e-mail: ${mail}
        `,
        html: question,
      });
      
      return 'ok';
    } catch (err) {
      ctx.badRequest(400, '');
    }
  }
};
