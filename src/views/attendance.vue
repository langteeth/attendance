<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val" width="120">
            </el-table-column>
            <el-table-column width="120" v-for="(val,key) in trainningDates" :key="key"  :label="val" >
            </el-table-column>
        </el-table>
        <div v-for="(item,index) in signList" :key="item.id">{{index+1}}.{{item.date}}
            <ul>
                <li v-for="(subItem,subIndex) in item.nameList" :key="subIndex"> {{subIndex + 1}}.{{subItem}}</li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            isShowOperate: {
                type:Boolean,
                default:true
            }
        },
        name: "attendance",
        data() {
            return {
                tableData: [],
                tableLabel: {
                    name1:'姓名',
                    gender1:'性别',


                },
                allDates:[],
                trainningDates:[],
                signList:[],


            }
        },
        computed: {

        },
        methods: {
            getList() {
                this.$axios({
                    method:'get',
                    url:'http://localhost:3000/signList'
                }).then(data => {
                    this.signList = data.data
                })
            }
        },
        created() {

            this.getList()
        }
    }
</script>

<style scoped>

</style>