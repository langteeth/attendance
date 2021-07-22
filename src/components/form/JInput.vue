<template>
    <div>
        <!-- 自定义组件要实现v-model必须实现:value, @input  -->
        <!--  $attrs存储的是props之外的部分      -->
        <input v-bind="$attrs" :value="value" @input="onInput">
    </div>
</template>

<script>
    export default {
        name: "JInput",
        inheritAttrs:false,//避免顶层容器继承属性
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        methods: {
            onInput(e) {
                //通知父组件数值变化
                this.$emit('input', e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>