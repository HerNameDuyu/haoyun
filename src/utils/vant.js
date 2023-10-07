import Vue from "vue";
import {
  Loading,
  Lazyload,
  Toast,
  Dialog,
  Form,
  Field,
  CellGroup,
  Button,
  Picker,
  Popup,
  NavBar,
  Col,
  Row,
  PullRefresh,
  Cell,
  List,
  Uploader,
  Icon,
  DatetimePicker,
  Tabbar,
  TabbarItem,
} from "vant";
import "vant/lib/datetime-picker/style";
// 默认vant组件
[
  Loading,
  Lazyload,
  Toast,
  Dialog,
  Form,
  Field,
  CellGroup,
  Button,
  Picker,
  Popup,
  NavBar,
  Col,
  Row,
  PullRefresh,
  Cell,
  List,
  Uploader,
  Icon,
  DatetimePicker,
  Tabbar,
  TabbarItem,
].forEach((item) => Vue.use(item));
// 先预制，后期做统一调整
Object.assign(window, {
  Toast,
  Dialog,
});
