<template>
  <div style="padding : 10px">
    <!-- <button @click="sendMsg">发送</button> -->
    <!-- <button @click="back">返回</button> -->
    <Row :gutter="16">
      <Col span="6" style="background: #d6dada;height:1000px;">
        <!-- 串口设置 -->
        <Row>
          <Col span="10">
            <label>串口</label>
          </Col>
          <Col span="14">
            <Select v-model="selectedPort.port" style="width:110px">
              <Option v-for="item in serialPort.portList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="padding5">
          <Col span="10">
            <label>波特率</label>
          </Col>
          <Col span="14">
            <Select v-model="selectedPort.baudRate" style="width:110px">
              <Option v-for="item in serialPort.baudRateList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="padding5">
          <Col span="10">
            <label>校验位</label>
          </Col>
          <Col span="14">
            <Select v-model="selectedPort.parity" style="width:110px">
              <Option v-for="item in serialPort.parityList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="padding5">
          <Col span="24">
            <Button long type="primary" @click="changeSPStatus">{{getSPStatus}}</Button>
          </Col>
        </Row>
      </Col>
      <Col span="18">
        <!-- 报文详情 -->
        <Row>
          <Col span="24">
            <label>接收报文：</label>
            <div>
              <Input id="showText" v-model="showReceiveStr" type="textarea" :autosize="{minRows: 10,maxRows: 12}" placeholder="接收报文..."></Input>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <label @dblclick="giveFrame">发送报文：</label>
            <div>
              <Input v-model="sendFrame" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="发送报文..."></Input>
            </div>
          </Col>
        </Row>
        <Row class="padding5">
          <Col offset="11" span="8">
          <Button type="success" @click="sendMsg">发送</Button>
          <Button type="info" @click="clearMessage">清空消息</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "communication",
  data() {
    return {
      sendFrame: "",
      receiveFrame: "",
      showReceiveStr : '',
      portInstance: {},
      serialPort: {
        portList: [],
        baudRateList: [1200, 2400, 4800, 9600, 115200],
        parityList: ["odd", "even", "none"]
      },
      selectedPort: {
        port: "COM1",
        baudRate: 2400,
        parity: "even"
      },
      SPStatus: true
    };
  },
  computed: {
    // 计算属性
    getSPStatus: function() {
      let showMsg;
      if (this.SPStatus) showMsg = "打开串口";
      if (!this.SPStatus) showMsg = "关闭串口";
      return showMsg;
    }
  },
  created() {
    // 初始化串口信息
    this.$SerialPort.list((err, ports) => {
      ports.forEach((port, index) => {
        this.serialPort.portList.push(port.comName);
      });
    });
  },
  methods: {
    buf2hex(buffer) { // buffer is an ArrayBuffer
      return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    },
    giveFrame() {
      this.sendFrame = 'FEFEFEFE68AAAAAAAAAAAA681300DF16';
    },
    clearMessage () {
      this.sendFrame = '';
      this.showReceiveStr = '';
      this.$Message.success('清除成功！');
    },
    changeSPStatus() {
      let showMsg;
      let receiveStr;
      let openOptions = {
        'baudRate' : parseInt(this.selectedPort.baudRate),
        'parity' : this.selectedPort.parity,
        'dataBits' : 8,
        'stopBits' : 1,
        'xon' : false,
        'xoff' : false,
        'xany' : false,
        'rtscts' : false
      };
      if (this.SPStatus) showMsg = "打开串口";
      if (!this.SPStatus) showMsg = "关闭串口";
      if (this.SPStatus) {
        this.portInstance = new this.$SerialPort(this.selectedPort.port, openOptions, err => {
          if (err) {
            this.$Message.error(showMsg + '失败！');
            return console.log("Error: ", err.message)
          }else{
            this.$Message.success(showMsg + '成功！');
            this.SPStatus = !this.SPStatus;
          }
        });
        // 监听数据
        if (this.portInstance) {
            this.portInstance.on('data', data => {
              this.receiveFrame = this.buf2hex(data).toUpperCase();
              receiveStr = '接收数据：';
              receiveStr += this.receiveFrame;
              this.showReceiveStr += receiveStr + '\n';
            });
        }
      } else {
        if (this.portInstance.isOpen) {
          this.portInstance.close();
          this.$Message.success(showMsg + '成功！');
          this.SPStatus = !this.SPStatus;
        }
      }
    },
    sendMsg() {
      let headStr;
      let sendStr;
      if (!this.SPStatus) {
        this.portInstance.write(this.sendFrame, 'hex', err => {
          if (err) return console.log("Error on write: ", err.message);
          headStr = '发送报文：';
          this.showReceiveStr += headStr + this.sendFrame + '\n';
        });
      } else {
         this.$Message.warning('请先打开串口！');
      }
    },
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
label {
  text-align: center;
  font-size: 16px;
  line-height: 2;
}
.padding5 {
  padding-top: 5px;
}
</style>
