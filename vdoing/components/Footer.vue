<template>
  <div class="footer">
    <div class="icons" v-if="social && social.icons">
      <a
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        v-for="(item, index) in social.icons"
        :key="index"
        target="_blank"
      ></a>
    </div>
    <!--Vdoing主题遵循MIT协议，完全开源且免费。如果您对主题的修改并不大，希望您保留主题的链接。-->
    <span>
      <a href="https://beian.miit.gov.cn/" target="_blank"><img src="https://cdn.itbob.cn/img/footer/icp_48x48.png" alt="ICP 备案" style="width:20px; height:auto; margin-bottom:-2px"> 鄂ICP备19003281号-9</a>丨
      <a href="https://beian.mps.gov.cn/" target="_blank"><img src="https://cdn.itbob.cn/img/footer/mps_48x48.png" alt="MPS 公网安备" style="width:auto; height:20px; margin-bottom:-4px"> 鄂公网安备42280202422959</a>丨
      <a href="https://github.com/xugaoyi/vuepress-theme-vdoing" target="_blank"><img src="https://cdn.itbob.cn/img/footer/vue_48x48.png" alt="Theme by Vdoing" style="width:18px; height:auto; margin-bottom:-4px"> Theme Vdoing</a>丨
      <a href="https://cloudbase.net/" target="_blank"><img src="https://cdn.itbob.cn/img/footer/cloudbase.png" alt="云开发 CloudBase" style="width:22px; height:auto; margin-bottom:-2px"> CloudBase</a>丨
      <a href="https://v6.51.la/land/3FcHt9RWSQ8XvN5u" target="_blank"><img src="https://sdk.51.la/icon/1-1.png" alt="51la 网站统计" style="width:auto; height:12px; margin-bottom:-1px"></a>
    </span>
    <br/>
    <br/>
    Copyright © 2023 - {{ new Date().getFullYear() }}<a href="https://itbob.cn/" target="_blank"> IT.BOB</a>丨
    <span ref="sitetime" id="sitetime">正在载入网站运行时间...</span>丨
    <!-- <template v-if="footer">
      | Copyright © {{ footer.createYear }}-{{ new Date().getFullYear() }}
      <span v-html="footer.copyrightInfo"></span>
    </template> -->
  </div>
</template>

<script>
export default {
  mounted() {
    const la51SpanElement = this.$refs.sitetime;
    if (la51SpanElement) {
      const la51scriptElement = document.createElement('script');
      la51scriptElement.id = 'LA-DATA-WIDGET';
      la51scriptElement.src = 'https://v6-widget.51.la/v6/3FpCxw5JhIELmjz2/quote.js?theme=#666666,#333333,#666666,#007BFF,#FFFFFF,#1690FF,13&f=12&display=0,0,0,1,0,1,0,1';
      // la51SpanElement.appendChild(la51scriptElement);
      la51SpanElement.insertAdjacentElement('afterend', la51scriptElement);
    }
  },
  computed: {
    social() {
      return this.$themeConfig.social
    },
    footer() {
      return this.$themeConfig.footer
    }
  }
}
</script>

<style lang='stylus'>
// $mobileSidebarWidth = $sidebarWidth * 0.82
.footer
  padding 5rem 1.5rem 2.5rem
  text-align center
  color #666
  box-sizing border-box
  font-size 0.85rem
  transition all 0.2s ease
  > span
    line-height 1.5rem
  .icons
    margin-bottom 12px
    .iconfont
      padding 0 10px
      font-size 1.3rem
  a
    color inherit
    &:hover
      color $accentColor
@media (min-width ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    padding-left: ($sidebarWidth + 1.5rem)
@media (min-width 1520px)
  .have-rightmenu .footer
    padding-right: ($rightMenuWidth + 1.5rem)
.no-sidebar .footer
  width auto
  padding-left 1.5rem
</style>
