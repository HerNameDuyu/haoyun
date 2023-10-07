<template>
  <div class="attachment-wrap">
    <van-nav-bar
      title="评估附件"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mainContent-wrap">
      <div class="image_box" v-for="(item, index) in allFileList" :key="index">
        <div>{{ item.fileSmallClassCaption }}</div>
        <div
          v-if="+item.maxSums > 1"
          class="upload_box"
          @click="handeMultip(item)"
        >
          <van-uploader
            v-model="item.fileList"
            accept="*"
            :max-count="1"
            :preview-full-image="false"
            disabled
            :deletable="false"
          >
          </van-uploader>
          <div class="upload_mask"></div>
        </div>
        <div v-else @click="handeSingle(item)">
          <van-uploader
            v-model="item.fileList"
            :after-read="afterRead"
            accept="*"
            :deletable="allowDelFlag == 1"
            :max-count="1"
            @delete="handleDelete"
          >
          </van-uploader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/index.js";
import { isEmpty, compressFile } from "@/utils/common.js";

export default {
  name: "Attachment",
  components: {},
  data() {
    return {
      allFileList: [],
      billId: "",
      allowDelFlag: 0, // 是否允许删除，1可以删除，0不可删除
      currentImg: "", // 当前选中的img
      queryPostData: "",
    };
  },
  created() {
    if (
      this.$route.params != undefined &&
      Object.keys(this.$route.params).length
    ) {
      this.billId = this.$route.params.billId;
      this.queryPostData = this.$route.params;
    }
    this.getFileInfo();
  },
  mounted() {},
  watch: {},
  methods: {
    onLoad() {},
    onRefresh() {
      Toast("刷新成功");
    },
    onClickLeft() {
      this.$router.go(-1);
      // this.$router.replace({
      //   name: "Details",
      //   params: this.queryPostData,
      // });
    },
    // 查看评估附件
    async getFileInfo() {
      let tempRes = {
        delFlag: "1",
        status: "1",
        record_list: [
          {
            fileSmallClassCaption: "行驶证",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "10206",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
          {
            fileSmallClassCaption: "登记证第1-2页",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "登记证第3-4页",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "登记证第5-6页",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "登记证第7-8页",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "车架号",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "车辆铭牌",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "前排座椅",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "后排座椅",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "里程表",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "左前45度",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "右后45度",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "中控台",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "1",
            needCompress: "1",
            fileId: "",
            fileUrl: "",
          },
          {
            fileSmallClassCaption: "附加图片",
            fileNature: "照片",
            mustInput: "否",
            minSums: "1",
            maxSums: "9",
            needCompress: "1",
            fileId: "10757",
            fileUrl: "https://img.yzcdn.cn/vant/leaf.jpg",
          },
        ],
      };

      // let res = tempRes;
      let query = {
        billId: this.billId,
      };
      let res = await api.getFileInfo(query).catch(() => {
        this.allFileList = [];
      });
      if (res.status == 1) {
        this.allowDelFlag = res.delFlag; // 是否允许删除，1可以删除，0不可删除
        res.record_list.forEach((item) => {
          item.fileList = isEmpty(item.fileId)
            ? []
            : [{ url: item.fileUrl, fileId: item.fileId }];
        });
        this.allFileList = res.record_list || [];
      }
    },
    // 附件上传之前处理
    beforeRead() {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }

      return false;
    },
    // 附件上传处理
    async afterRead(files) {
      console.log("hhhh", files);
      if (!files) return;

      // needCompress 是否压缩
      let baseImage = "";
      //接口图片上限是1.5MB,对大于1MB的图片进行压缩
      //压缩是一个异步过程
      if (this.currentImg.needCompress == 1) {
        baseImage = await compressFile(files.content);
      } else {
        baseImage = files.content;
      }
      // if (files.file.size > 1 * 1024 * 1024) {
      //   baseImage = await this.compress(files.content);
      // } else {
      //   baseImage = files.content;
      // }

      // 只允许上传一张
      let filesData = new FormData();
      let fileName = files.file.name;
      let query = {
        billId: this.billId,
        fileSmallClass: this.currentImg.fileSmallClass || "",
        userId: window.localStorage.getItem("vinUserId") || "",
        fileName: baseImage,
      };
      filesData.append("billId", query.billId);
      filesData.append("fileSmallClass", query.fileSmallClass);
      filesData.append("userId", query.userId);
      // 上传一张
      let conmpresedFile = this.toBlogToFile(baseImage);
      // files.file 无法压缩，转base64压缩后再转换为blob文件再转File文件
      filesData.append(`${files.file.name}`, conmpresedFile);

      api.uploadFileInfo(filesData).then((res) => {
        if (res.status == 1) {
          Toast.success("附件上传成功！");
          this.getFileInfo();
        }
      });
    },
    toBlogToFile(base64) {
      // baser64 TO blob 再转 File
      let arr = base64.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bytes = atob(arr[1]);
      let bytesLength = bytes.length;
      let u8arr = new Uint8Array(bytesLength);
      for (let i = 0; i < bytes.length; i++) {
        u8arr[i] = bytes.charCodeAt(i);
      }
      let blob = new Blob([u8arr], { type: mime });
      let files = new File([blob], "test.jpg", { type: blob.type });
      return files;
    },
    // 点击图片，单张
    handeSingle(item) {
      this.currentImg = item;
    },
    // 多张图片上传
    handeMultip(item) {
      let postData = item;
      postData.billId = this.billId;
      postData.allowDelFlag = this.allowDelFlag;

      this.$router.replace({
        name: "DynamicAttachment",
        params: postData,
      });
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
  // overflow: scroll;
  margin: 0 0.3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .image_box {
    height: 2.5rem;
    // width: 2.5rem;
    .upload_box {
      position: relative;
    }
    .upload_mask {
      width: 100%;
      height: 100%;
      position: absolute;
      // z-index: 9;
      top: 0;
    }
  }
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+, edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
