
<template>
    <div class="footer">
        <div class="bg-teal d-flex justify-center align-center px-4 w-100">
            <strong>Get connected with us on social networks!</strong>


            <a href="https://in.linkedin.com/showcase/life-argusoft/" target="_blank">
                <v-btn class="mx-4" icon="mdi-facebook" aize="small" variant="plain"></v-btn>
            </a>
            <a href="https://twitter.com/argusoft" target="_blank">
                <v-btn class="mx-4" icon="mdi-twitter" aize="small" variant="plain"></v-btn>
            </a>
            <a href="https://www.facebook.com/argusoft/posts/d41d8cd9/3615088178538302/" target="_blank">
                <v-btn class="mx-4" icon="mdi-linkedin" aize="small" variant="plain"></v-btn>
            </a>
        </div>

        <div class="py-2 bg-black text-center w-100">
            {{ new Date().getFullYear() }} —
            <strong> Argusoft || All Rights Reserved</strong>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    color: aquamarine
}

.footer{
    margin-top: 70vh;
}
</style>
