<template>
    <div>
        <Table ref="table" :columns="columns" :data="tableData" stripe>
            <template slot-scope="{row, index}" slot="operate">
<!--                 <Button type="primary" style="margin-right: 5px;">编辑</Button>-->
<!--                 <Button type="primary" style="margin-right: 5px;">编辑</Button>-->
                <Row>
                    <Col>
                        <modal-button BtnType="primary" title="编辑" style="margin-right: 5px;"  :width="100" />
                    </Col>
                    <Col>
                        <modal-button BtnType="error" title="删除" style="margin-right: 5px;"  :width="100" />
                    </Col>
                </Row>


            </template>
        </Table>
    </div>
</template>

<script>
    import ModalButton from '@/components/ModalButton/'
    export default {
        name: "person",
        components:{
          ModalButton
        },
        data() {
            return {
                columns:[
                    {
                        title:'姓名',
                        key:'name'
                    },
                    {
                        title:'性别'
                    },
                    {
                        title:'人员类型'
                    },
                    {
                        title:'场上位置'
                    },
                    {
                        title:'惯用手'
                    },
                    {
                        title:'身高'
                    },
                    {
                        title:'学校'
                    },
                    {
                        title:'出勤日期',
                        sortable: true,
                        render: (h, {row}) => {
                            let date = []
                            this.originData.forEach(item => {
                               if(item.nameList.indexOf(row.name) !== -1) {
                                  date.push(item.date.slice(5,10)+',')
                               }
                            })
                            return h('div', date)
                        }
                    },
                    {
                        title:'出勤次数',
                        sortable: true,
                        render:(h, {row}) => {
                           let sign = this.nameNum[row.name]?this.nameNum[row.name]:0,
                               absent = this.absentCount[row.name]? this.absentCount[row.name]: 0
                            let count = sign - absent
                           return  h('div',Number(count))
                        }
                    },
                    {
                        title:'报名次数',
                        sortable: true,
                        render:(h, {row}) => {
                           let count = this.nameNum[row.name]
                           return  h('div',Number(count))
                        }
                    },
                    {
                        title:'缺勤日期',
                        render: (h, {row}) => {
                            let date = []
                            this.originData.forEach(item => {
                                if(item.absent.indexOf(row.name) !== -1) {
                                    date.push(item.date.slice(5,10)+',')
                                }
                            })
                            return h('div', date)
                        }
                    },
                    {
                        title:'缺勤次数',
                        sortable: true,
                        render:(h, {row}) => {
                            let count = this.absentCount[row.name]? this.absentCount[row.name]: 0
                            return  h('div',Number(count))
                        }
                    },
                    {
                        title:'技术特点'
                    },
                    {
                        title:'操作',
                        slot:'operate',
                        align:'center',
                        width:300
                    }


                ],
                originData:[],
                tableData:[],
                signList:[],
                nameNum:{},
                absentCount:{}
            }
        },
        methods:{
           async getList() {
               let {data} = await this.$axios.get('http://localhost:3000/signList')
               // console.log(data)
               this.originData = data
               // 将报名表字符串转换为二维数组
              // const nameList = data.map(item => item.nameList.split('\n').map(_ => _.split('.')[1]))
              //将二维数组扁平化

               // const flatten = _.flattenDeep(this.getNameList(data))
               // console.log(flatten)
               //将报名表整理为一维数组
               // this.signList = _.map(flatten,_.trim)
               //数组名单去重
               // const nameSet = [...new Set(_.map(flatten,_.trim))]
               // console.log(nameSet);
               //将名单存入对象
               this.signList = this.getSignList(data)
               console.log(this.signList)
               this.toJSON()

               const nameSet = this.StrToArr(data)
               const arr = [];
               for (let i in nameSet) {
                   const obj = {
                       name:nameSet[i]
                   }
                   arr.push(obj)
               }
               this.tableData = arr
               // console.log(this.tableData)

               //计算报名名单的次数
               this.nameNum = this.signList.reduce((pre, cur) => {
                   if (cur in pre) {
                       pre[cur]++
                   } else {
                       pre[cur] = 1
                   }
                   return pre
               },{})
               console.log(this.nameNum)
               //计算缺席名单的次数
               const absent = data.map(item => item.absent)
               const absentList = _.map(_.flattenDeep(absent),_.trim)
               this.absentCount = absentList.reduce((pre, cur) => {
                   if (cur in pre) {
                       pre[cur]++
                   } else {
                       pre[cur] = 1
                   }
                   return pre
               },{})
           },
           toJSON() {//将训练人员生成对象Push到数组
               const arr = [];

               this.signList.forEach(item =>{

                   const obj = {
                       name: item,
                       sex : '女',
                       type: '社会人员',
                       position:'',
                       hand:'右手',
                       height: 177,
                       times: 0,
                       attendDate:[],
                       signTimes:0,
                       absentTimes:0,
                   };

                   arr.push(obj)

               })
               const arrJson = JSON.stringify(arr)
               console.log(arrJson)


           },
           getNameList(data) {
               // 将报名表字符串转换为二维数组
               return data.map(item => item.nameList.split('\n').map(_ => _.split('.')[1]))

           },
           flatten(data) {//将多维数组转化为一维数组
               return  _.flattenDeep(data)
           },
           getSignList(data) {
              const flatten = _.flattenDeep(this.getNameList(data))
              return   _.map(flatten, _.trim)
           },
           removeDuplicate(arr) {//数组去重
             return [...new Set(_.map(arr,_.trim))]
           },
           StrToArr(data) {//将报名字符串转为数组
              return this.removeDuplicate(this.flatten(this.getNameList(data)))
           }

        },
        mounted() {
            this.getList()

        }
    }
</script>

<style scoped>

</style>