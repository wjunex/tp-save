<template>
  <div>
    <el-row type="flex" justify="center">
      <el-input
        v-model="imgUrl"
        placeholder="输入链接"
        style="width: 70%"
      ></el-input>
      <el-button type="success" @click="downloadimg(imgUrl)">下载</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    downloadimg(val) {
      console.log(val);
      if (val.search("https://pbs.twimg.com/media/") === 0) {
        /* 处理下载链接 */
        let link = val.replace("jpg", "png").split("=");
        link[2] = "large";
        let downloadurl = link.join("=");
        /* 处理名字 */
        let a = link[0].replace("https://pbs.twimg.com/media/", "");
        let name = a.replace("?format", "");

        console.log(name);
        console.log(downloadurl);
        this.downloadByBlob(downloadurl, name);
        this.imgUrl = ''
      } else {
        console.log("链接错误，无法下载！");
      }
    },
    downloadByBlob(url, name) {
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
</style>
