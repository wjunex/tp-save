<template>
  <div class="about">
    <el-button type="success" @click="downloadallimg">开始下载</el-button>
    <el-button type="danger" @click="stopDownload">停止下载</el-button>
  </div>
</template>

<script>
import photoList from "@/common/url.js";
export default {
  created() {
    this.dataList = photoList;
  },
  data() {
    return {
      dataList: [],
      stop: false,
    };
  },
  methods: {
    downloadallimg() {
      this.dataList.forEach(async (item, index) => {
        await this.downloadByBlob(item, `kir${index + 1}`);
      });
    },
    stopDownload() {
      this.stop = true;
    },
    downloadByBlob(url, name) {
      if (this.stop) return;
      console.log(`${name}正在下载,url:${url}`);
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          this.download(url, name);
          // 用完释放URL对象
          URL.revokeObjectURL(url);
          console.log(
            `${name}下载完成！剩余未下载个数：${this.dataList.length}`
          );
        });
      };
    },
    download(href, name) {
      let eleLink = document.createElement("a");
      eleLink.download = name;
      eleLink.href = href;
      eleLink.click();
      eleLink.remove();
    },
  },
};
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
