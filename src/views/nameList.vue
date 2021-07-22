<template>
    <div>
<!--        <JForm></JForm>-->
<!--        <HelloWorld msg="welcome to vue" ref="kkk" @foo="onFoo($event)"/>-->
<!--        <HelloWorld2></HelloWorld2>-->

        训练人员名单
        <div>
            <el-button type="primary" plain @click="copy()">复制</el-button>
        </div>
        <Table ref="table" :columns="columns" :data="tableData" stripe>

        </Table>
       <download-excel :data="tableData"
                       :fields="json_fields"
                       name="2021排球训练日程表.xls"
       >
           <Button type="primary" >
               <Icon type="ios-download-outline"></Icon>
               导出表格
           </Button>
       </download-excel>

    </div>
</template>

<script>
    import JForm from '../components/form/'
    // import HelloWorld from "../components/HelloWorld";
    // import HelloWorld2 from "../components/HelloWorld2";
    export default {
        name: "nameList",
        provide() {
          return { dong: this}
        },
        components: {
            // HelloWorld,
            // HelloWorld2
            JForm

        },
        data() {
            return {
                columns: [
                    {
                        title: '训练日期',
                        key: 'date'
                    },
                    {
                        title: '训练时间',
                        key: 'time'
                    },
                    {
                        title: '训练时长',
                        key: 'count',
                        render: (h, {row}) => {
                            return h('div', row.count + '小时')
                        }
                    },
                    {
                        title: '训练类型',
                        key: 'type'
                    },
                    {
                        title: '训练馆',
                        key: 'gym'
                    },
                    {
                        title: '训练人数',
                        key: 'nameList',
                        render: (h, {row}) => {
                            let count = row.nameList.split('\n').map(item => item.split('.')[1])
                            return h('div', count.length)
                        }
                    },
                    {
                        title: '实到人数',
                        key: 'nameList',
                        render: (h, {row}) => {
                            let count = row.nameList.split('\n').map(item => item.split('.')[1])
                            return h('div', count.length)
                        }
                    },
                    {
                        title: '缺勤人数',
                        key: 'absent',
                        render: (h, {row}) => {
                            let absent = row.absent.length
                            return h('div', absent)
                        }
                    },
                    {
                        title: '缺勤名单',
                        tooltip: true,
                        render: (h, {row}) => {
                            let absentList = row.absent.join(',')
                            return h('div', absentList)
                        }
                    },
                    {
                        title: '报名名单',
                        key: 'nameList',
                        tooltip: true,
                        render:(h,{row}) =>{
                            let nameList = row.nameList.split('\n')
                            return h('div',nameList)
                        }
                        // render:(h, {row}) =>{
                        //
                        // }
                    },
                    {
                        title: '教练名单',
                        key: 'coach',
                        render: (h, {row}) => {
                            let coachList = row.coach.join(',')
                            return h('div', coachList)
                        }

                    }
                ],
                tableData: [],
                nameList: [],
                json_fields: {
                    "训练日期": "date",
                    "训练时间": "time",
                    "训练时长":"count",
                    "训练类型":"type",
                    "训练馆":"gym",
                    "训练人数":{
                        field:"nameList",
                        callback: (value) => {
                            let count = value.split('\n').map(item => item.split('.')[1]).length
                            return count
                        }
                    },

                    "报名名单": "nameList",
                    "缺勤名单": {
                        field:"absent",
                        callback: (value) => {
                            let list = value.join(',')
                            return list
                        }
                    },
                    "缺勤人数": {
                        field:"nameList",
                        callback: (value) => {
                            let count = value.split('\n').map(item => item.split('.')[1]).length
                            return count
                        }
                    },


                },
                scaleWidth:1920


            }
        },
        watch:{
          scaleWidth:{
              handler(newVal) {
                  console.log(newVal)
                  if (newVal > 2000) {
                      // this.resize()
                  } else {

                  }

              },
              immediate:true
          }
        },
        methods: {
            resize() {
                var header = document.querySelector('.ivu-table-header')
                header.style.color = 'red';

            },
            copy() {
                document.execCommand('Copy')
                this.$message({
                    message:'复制成功',
                    type:'success'
                })
            },
            getList() {
                this.$axios.get('http://localhost:3000/signList').then(res => {
                    this.tableData = res.data
                    console.log(this.tableData)
                    this.nameList = this.tableData.map(item => item.nameList.split('\n').map(_ => _.split('.')[1]))
                    // const list = this.tableData[0].names.split('\n').map(item => item.split('.')[1].trim())
                    //  this.nameList.names = list
                    console.log(this.nameList)

                })
            },
            exportData() {
                this.$refs.table.exportCsv({
                    filename: '2021排球训练日程表',
                    columns:this.columns,


                })
            },
            onFoo(e) {
                console.log(e)
            }
        },
        mounted() {
            this.getList();
            // this.$refs.kkk.foo = 'bar'
            // this.$children[0].foo = 'dong'
            window.onresize =()=> {
                return (() =>{
                   this.scaleWidth = window.innerWidth
                })()
            }
        }
    }
</script>

<style scoped>

</style>