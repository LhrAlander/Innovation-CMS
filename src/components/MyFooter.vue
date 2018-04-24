<template>
    <footer>
      <div class="friend-links">
        <div class="container">
        <friend-link v-for="item in linkItems" :key='item.itemName' :iconCode="item.iconCode" :itemName="item.itemName" :href="item.href"></friend-link>
        </div>
      </div>
      <div class="meta-container">
        <p class="copyright">&copy;2017 杭州师范大学图书馆 Email: tsgbgs@hznu.edu.cn 电话：0571-28865828 本页访问次数： 821557 </p>
        <p class="copyright">通讯地址：浙江省杭州市余杭区仓前街道余杭塘路2318号杭州师范大学图书馆 邮编311121</p>
      </div>
    </footer>
</template>

<script>
  import FriendLink from './FriendLink'
  const ITEMS = [
    {
      iconCode: '&#xe624;',
      itemName: '校园网站',
      href: '/'
    },
    {
      iconCode: '&#xe602;',
      itemName: '信息公开网',
      href: '/'
    },
    {
      iconCode: '&#xe60d;',
      itemName: '图书馆',
      href: '/'
    },
    {
      iconCode: '&#xe697;',
      itemName: '使用帮助',
      href: '/'
    },
    {
      iconCode: '&#xe611;',
      itemName: '联系我们',
      href: '/'
    },
    {
      iconCode: '&#xe638;',
      itemName: '官方微信',
      href: '/'
    }
  ]
  export default {
    components: {
      FriendLink
    },
    data () {
      return {
        linkItems: ITEMS
      }
    }
  }
</script>

<style scoped>

  .container {
    height: 100%;
    width: 1140px;
    margin: 0 auto;
    padding: 20px 0;
    display:  flex;
    justify-content: space-around;
  }


  .friend-links {
    background-color: rgb(239, 245, 250);
    border-bottom: 1px solid #fff;
  }





  p.copyright {
    font-size: .9rem;
    /*font-weight: 700;*/
    padding: .5rem 0 0;
    text-align: center;
  }

  .meta-container {
    background: rgb(208, 235, 247);
    padding-bottom: 15px;
  }

</style>
