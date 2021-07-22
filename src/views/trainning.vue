<template>
    <div class="trainning">
        <Table :columns="columns" :data="tableData" stripe>

        </Table>
    </div>
</template>

<script>
    export default {
        name: "trainning",
        data() {
            return {
                columns: [
                    {
                        title:'姓名',
                        key:'name'
                    },
                    {
                        title:'性别',
                        key:'sex'
                    },
                    {
                        title:'年龄',
                        key:'age'
                    },
                    {
                        title:'人员类型',
                        key:'type'
                    },
                    {
                        title:'技术水平',
                        key:'trainningType'
                    },
                    {
                        title:'身高',
                        key:'height'
                    },
                    {
                        title:'学校',
                        key:'school'
                    },
                    {
                        title:'备注',
                        key: 'comments'
                    },
                ],
                tableData:[
                    {
                        name: "赵雅涵",
                        sex: "女",
                        age: 14,
                        type: "学生",
                        trainningType:'基础',
                        position: "",
                        hand: "右手",
                        school:'实验中学',
                        height: 155,
                        times: 0,
                        attendDate: [],
                        signTimes: 0,
                        absentTimes: 0,
                        comments:'7月12放暑假后可参加'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>