<template>
    <div class="footer">
        <p>&copy; 2023 Argusoft private ltd</p>
        <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
    </div>
</template>

<style scoped>
        /* Reset some default styles */
        *{
            margin: 0;
            padding: 0;
            box-sizing:border-box;
        }

        /* Style the footer container */
        .footer {
            position:fixed;
            bottom:0;
            left:0;
            background-color: #333;
            color: white;
            text-align: center;
            padding: 20px 0;
            width:100%;
        }

        /* Style footer links */
        .footer a {
            color: white;
            text-decoration: none;
        }

        /* Style footer links on hover */
        .footer a:hover {
            text-decoration: underline;
        }
    </style>