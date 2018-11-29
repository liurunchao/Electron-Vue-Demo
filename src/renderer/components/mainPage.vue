<template>
  <div class="layout">
    <Layout>
      <div class="leftMenu">
        <Sider
          class="leftMenu"
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          v-model="isCollapsed"
        >
          <Menu active-name="1-3" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon>
              <span>
                <router-link to="/NewPage">页面1</router-link>
              </span>
            </MenuItem>
            <MenuItem name="1-2">
              <Icon type="ios-search"></Icon>
              <span>
                <router-link to="/others">页面2</router-link>
              </span>
            </MenuItem>
            <MenuItem name="1-3">
              <Icon type="ios-settings"></Icon>
              <span>
                <router-link to="/communication">串口通讯</router-link>
              </span>
            </MenuItem>
          </Menu>
        </Sider>
      </div>
      <Layout>
        <Header :style="{padding: 0,height:'59px'}" class="layout-header-bar">
          <Row>
            <Col span="4">
              <Icon
                @click.native="collapsedSider"
                :class="rotateIcon"
                :style="{margin: '0 20px'}"
                type="md-menu"
                size="24"
              ></Icon>
            </Col>
            <Col span="20">
              <Menu mode="horizontal" active-name="1">
                <div class="layout-nav">
                  <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>Item 1
                  </MenuItem>
                  <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>Item 2
                  </MenuItem>
                  <MenuItem name="3">
                    <Icon type="ios-analytics"></Icon>Item 3
                  </MenuItem>
                  <MenuItem name="4">
                    <Icon type="ios-paper"></Icon>Item 4
                  </MenuItem>
                </div>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content :style="{margin: '8px', background: '#fff', minHeight: '260px'}">
          <!-- 嵌套路由 -->
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// const Serialport = require("serialport");

export default {
  name: "main-page",
  data() {
    return {
      isCollapsed: false
    };
  },
  created() {

  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
