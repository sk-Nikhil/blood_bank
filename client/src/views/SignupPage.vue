<template>
    <div class="register">
        <form class="form">
            <label for="chk" aria-hidden="true">Register</label>
            <input class="input" type="text" name="txt" placeholder="username" required>
            <input type="email" class="input" name="email" placeholder="Email" required>
            <input type="password" class="input" name="pswd" placeholder="Password" required>
            <button>Register</button>
        </form>
    </div>

</template>

<script>
export default{
    beforeCreate(){
        console.log("signup")
    }
    
}
</script>


<style scoped>
.register{
    background:#eee;
    border-radius: 60%/10%;
    transform:translateY(5%);
    transition:.8s ease-in-out;
}

.register label{
    color:#573b8a;
    transform: scale(.6);
}

#chk:checked ~ .register label{
    transform:scale(1);
    margin:10% 0 5%;
}

#chk:checked ~ .login label{
    transform:scale(.6);
    margin:5% 0 5%;
}

.form buton:hover{
    background-color: #6d44b8;
}
</style>