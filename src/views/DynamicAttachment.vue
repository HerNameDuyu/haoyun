<template>
  <div class="attachment-wrap">
    <van-nav-bar
      :title="attachmentNavTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContent-wrap">
      <!-- <div class="ocrBox">
          <van-uploader
            v-model="fileList"
            :max-count="maxFileCount"
            multiple
            :accept="'image/*'"
            deletable
            upload-text="OCR识别"
            style="
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            :after-read="afterRead"
          >
            <div class="cameraBox">
              <img src="../assets/icons/camera1.png" />
            </div>
          </van-uploader>
        </div> -->
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        accept="*"
        multiple
        :deletable="allowDelFlag == 1"
        :max-count="maxFileCount"
        @delete="handleDelete"
      >
      </van-uploader>
      <!-- <div class="formItemBox2">
          <div class="innerBox">
            <div class="leftBtn">
              <van-uploader
                :after-read="afterRead"
                accept="vedio/*,.mp4,.mov,.ogg"
                multiple
              >
                <van-button icon="photograph" type="primary" size="small"
                  >上传视频</van-button
                >
              </van-uploader>
              <van-uploader :after-read="afterRead" accept="*" multiple>
                <van-button icon="plus" type="primary" size="small"
                  >上传附件</van-button
                >
              </van-uploader>
            </div>
            <div class="rightContent">
              <div class="item" v-for="(file, index) in fileList" :key="index">
                <span>{{ index + 1 }}.{{ file.file.name }}</span>
                <van-icon name="close" @click="deleteFlie(index)" />
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "../api/index.js";
import { isEmpty } from "@/utils/common.js";

export default {
  name: "DynamicAttachment",
  components: {},
  data() {
    return {
      fileList: [],
      billId: "",
      attachmentNavTitle: "评估附件",
      maxFileCount: 1,
      fileSmallClass: "",
      allowDelFlag: 0, // 是否允许删除，1可以删除，0不可删除
    };
  },
  created() {
    if (
      this.$route.params != undefined &&
      Object.keys(this.$route.params).length
    ) {
      let postDatas = this.$route.params;
      this.billId = postDatas.billId;
      this.maxFileCount = postDatas.maxSums;
      this.attachmentNavTitle = postDatas.fileSmallClassCaption;
      this.fileSmallClass = postDatas.fileSmallClass;
      this.allowDelFlag = postDatas.allowDelFlag;
    }
    this.getAttachmenetDetail();
  },
  mounted() {},
  watch: {},
  methods: {
    onLoad() {},
    onRefresh() {
      Toast("刷新成功");
    },
    onClickLeft() {
      let postData = { billId: this.billId };
      this.$router.replace({
        name: "Attachment",
        params: postData,
      });
      // this.$router.go(-1);
    },
    // 附件上传处理
    afterRead(files) {
      // 上传多个或者一个都可以
      let uploadNum = 1;
      if (files.length && files.length > 1) {
        uploadNum = files.length;
      }
      let filesData = new FormData();
      let query = {
        billId: this.billId,
        fileSmallClass: this.fileSmallClass,
        userId: window.localStorage.getItem("vinUserId") || "",
      };
      filesData.append("billId", query.billId);
      filesData.append("fileSmallClass", query.fileSmallClass);
      filesData.append("userId", query.userId);
      //   上传多个
      if (uploadNum > 1) {
        files.forEach((file) => {
          let randomstr = this.randomNumber();
          filesData.append(`${randomstr}${file.file.name}`, file.file);
        });
      } else {
        // 上传一个
        filesData.append(`${files.file.name}`, files.file);
      }

      api.uploadFileInfo(filesData).then((res) => {
        if (res.status == 1) {
          Toast.success("上传成功！");
          this.getAttachmenetDetail();
        }
      });
    },
    randomNumber(length = 6, chars) {
      let result = "";
      let charsString =
        chars ||
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = length; i > 0; --i) {
        result += charsString[Math.floor(Math.random() * charsString.length)];
      }
      return result;
    },
    // 获取附件详情
    async getAttachmenetDetail() {
      let temRes = {
        status: "1",
        record_list: [
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileId: "10758",
            fileUrl:
              "http://121.199.47.188:8000/评估附件/10000000/评估材料/附加图片/营业执照.jpg",
          },
        ],
      };

      let query = {
        billId: this.billId,
        fileSmallClass: this.fileSmallClass,
      };
      //   let res = temRes;
      let res = await api.getMoreFileInfo(query).catch((err) => {});
      if (res.status == 1) {
        let fileLists = [];
        res.record_list.forEach((item) => {
          fileLists.push({ url: item.fileUrl, fileId: item.fileId });
        });
        this.fileList = fileLists;
      }
    },
    // 删除
    handleDelete(file) {
      if (this.allowDelFlag == 1) {
        let query = {
          fid: file.fileId,
        };
        api
          .deleteFileInfo(query)
          .then((res) => {
            if (res.status == 1) {
              Toast.success("删除成功");
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>
<style scoped lang="scss">
.attachment-wrap {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.mainContent-wrap {
  flex: 1;
  overflow: scroll;
  margin: 0 0.3rem;
  display: flex;
  .ocrBox {
    margin: 0.2rem 0.2rem 0.6rem 0.2rem;
    background-color: #f7f8fa;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    .cameraBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      // padding: 0.2rem;
      border: 0.013333rem #cdcdcd solid;
      img {
        width: 1rem;
        height: 1rem;
        // width: 100%;
        // height: 100%;
      }
    }
  }
}
</style>
