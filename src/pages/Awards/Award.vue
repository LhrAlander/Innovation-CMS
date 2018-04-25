<template>
	<main>
		<div class="wrapper">
			<my-header></my-header>
			<section class="container">
				<header>
					<div class="title">获奖情况</div>
				</header>
				<el-table
					:data="tableData"
					border
					stripe="true">
					<el-table-column
						prop="id"
						label="序号"
						width="50">
					</el-table-column>
					<el-table-column
						prop="awardName"
						label="获奖名称">
					</el-table-column>
					<el-table-column
						prop="awardIdentity"
						label="获奖级别">
					</el-table-column>
					<el-table-column
						prop="awardLevel"
						label="获奖等级">
					</el-table-column>
					<el-table-column
						prop="awardTime"
						label="获奖时间">
					</el-table-column>
					<el-table-column
						prop="users"
						label="获奖人名单">
					</el-table-column>
				</el-table>
			</section>
			<section class="container pager">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					layout=" prev, pager, next, jumper"
					:total="totalCount">
				</el-pagination>
			</section>
		</div>
		<my-footer class='footer'></my-footer>
	</main>
</template>
<script>
import MyHeader from "components/MyHeader";
import MyFooter from "components/MyFooter";
import axios from "@/utils/https";
export default {
	mounted() {
		this.initData()
	},
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          awardName: "服务外包大赛",
          awardIdentity: "国赛",
          awardLevel: "一等奖",
          awardTime: "2018/05/01",
          users: "林海瑞 滕飞 余煜淇 吴佳思 杨贺晨吉"
        },
        {
          id: 2,
          awardName: "服务外包大赛",
          awardIdentity: "国赛",
          awardLevel: "一等奖",
          awardTime: "2018/05/01",
          users: "林海瑞 滕飞 余煜淇 吴佳思 杨贺晨吉"
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalCount: 21
    };
	},
	methods: {
		initData() {
			axios.post('/api/front/awards/users', {
				currentPage: this.currentPage,
				pageSize: this.pageSize
			})
			.then(res => {
				if (res.status == 200 && res.data.code == 200) {
					this.tableData = res.data.data
					this.totalCount = res.data.total
				}
			})
			.catch(err => {
				 console.log(err)
			})
		}
	}
};
</script>
<style scoped>
.container {
  width: 1080px;
  padding: 0 30px;
}
header {
  width: 100%;
  height: 34px;
  margin-bottom: 10px;
  border-bottom: 2px solid #5394c5;
}
header .title {
  width: 128px;
  height: 100%;
  background: #5394c5;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}
main {
  min-height: 100%;
}
.wrapper {
  min-height: calc(100vh - 282px);
}
.container {
  width: 1080px;
  padding: 0 30px;
  margin: 0 auto;
}

.el-pagination {
  text-align: center;
  margin: 62px auto;
}
.display-tmpl {
  margin-top: 30px;
}

.footer {
  width: 100%;
  height: 220px;
}
</style>
