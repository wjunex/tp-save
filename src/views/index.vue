<template>
  <div class="content">
    <el-row type="flex" justify="center" style="margin: 40px 0">
      <el-radio-group v-model="type">
        <el-radio-button label="single">单张下载</el-radio-button>
        <el-radio-button label="batch">批量下载</el-radio-button>
      </el-radio-group>
    </el-row>
    <single v-show="type === 'single'" />
    <batch v-show="type === 'batch'" />
  </div>
</template>

<script>
import single from "./single.vue";
import batch from "./batch.vue";
export default {
  components: {
    single,
    batch,
  },
  data() {
    return {
      type: "single",
    };
  },
};
</script>

<style>
.content {
  width: 60%;
  margin: 0 auto;
}
</style>