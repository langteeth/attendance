<template>
    <div class="hello" @click="$parent.$emit('kiss')">
        <h1 @click="$emit('foo','bar')">{{ msg}}</h1>
        <h2>{{foo}}</h2>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        inject:['dong'],
        props: {
            msg: String
        },
        data() {
            return {
                foo: 'foo'
            }
        },
        created() {
            this.$parent.$on('mua', ()=> {
                console.log('mua')
            })
        }
    }
</script>

<style scoped>

</style>