const prefix = 'https://cors-anywhere.herokuapp.com/' // h5端只能添加跨域代理服务器

export const Api = {
  getLearnQianNeng: `${prefix}http://bz.hpeng.cn/Ajax/AjaxQianNeng.aspx`, // 获取学习所需潜能
  getFuDi: `${prefix}http://bz.hpeng.cn/Ajax/AjaxFuDi.aspx`, // 获取福地奖励内容
  getZhuangBei: `${prefix}http://bz.hpeng.cn/Ajax/AjaxGetZB.aspx`, // 获取装备列表
  getCang: `${prefix}http://bz.hpeng.cn/Ajax/AjaxNews.aspx`, // 获取藏经阁数据
  getNpc: `${prefix}http://bz.hpeng.cn/Ajax/AjaxNPC.aspx`, // 获取npc数据
}