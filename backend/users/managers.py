from django.contrib.auth.models import UserManager as DefaultUserManager


class UserManager(DefaultUserManager):

    def create_test_user(self, num = None):
        username = "test"
        email = "test@gmail.com"
        password = "testuser123"
        
        if num:
            username = f'{username}{num}'
            email = f'{email}{num}'

        user = self.create_user(username=username, email=email, password=password)
        return user