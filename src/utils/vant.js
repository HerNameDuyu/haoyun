import Vue from 'vue'
import {Loading, Lazyload, Toast, Dialog,
    Form, Field, CellGroup,Button,Picker,Popup,NavBar,Col, Row
} from 'vant'
// 默认vant组件
[Loading, Lazyload, Toast, Dialog,
    Form, Field, CellGroup,Button,Picker,Popup,NavBar,Col, Row
].forEach(item => Vue.use(item))
// 先预制，后期做统一调整
Object.assign(window, {
  Toast, Dialog
})