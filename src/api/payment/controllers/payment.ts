'use strict';

export default {
  async topUp(ctx: any) {
    const { amount } = ctx.request.body;
    const userId = ctx.state?.user?.id || 1;
    if (!amount || amount <= 0) return ctx.badRequest('Некорректная сумма');
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId, { fields: ['id', 'balance'] });
    const currentBalance = user?.balance || 5000;
    await strapi.entityService.update('plugin::users-permissions.user', userId, { data: { balance: currentBalance + amount } });
    return { success: true, newBalance: currentBalance + amount, message: `Баланс пополнен на ${amount} ₽` };
  },
};
