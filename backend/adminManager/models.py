from django.db import models


from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

class JobRole(models.Model):
    designation = models.CharField(max_length=50, unique=True)
    
    class Meta:
       ordering = ['designation']


class JobLocation(models.Model):
    location= models.CharField(max_length=50, unique= True)

    class Meta:
        ordering = ['location']


class MasterEmployeeManager(BaseUserManager):
   
    def create_user(self, emp_name,username,password,email,designation,location):
        if not email:
            raise ValueError("must have email")
        if not username:
            raise ValueError("must have username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            

        )
        user.emp_name = emp_name
        print("Yo")
        user.set_password(password)
        user.location=location
        user.save(using=self._db)
        print("joy")
        Jobs = JobRole.objects.all()
        for x in designation:
            user.designation.add(x)
        print("joy2")    
        print(location.id)
        print(location.location)
        print("final")
        
        
        return user

    def create_superuser(self, email, username, password):

        user= self.create_user(
            emp_name=username,
            email=self.normalize_email(email),
            password=password,
            username=username,
            designation=null,
            location=null

        )    
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user


class MasterEmployee(AbstractBaseUser):
    email= models.EmailField(verbose_name="email",max_length=68, unique=True)
    username=models.CharField(max_length=30, unique=True)
    emp_name=models.CharField(max_length=30)
    is_admin=models.BooleanField(default=False)
    last_login=models.DateTimeField(verbose_name='last login', auto_now=True)
    date_joined=models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    designation=models.ManyToManyField(JobRole)
    location=models.ForeignKey(JobLocation, blank=True, null=True, on_delete=models.SET_NULL)


    USERNAME_FIELD= 'username'
    REQUIRED_FIELDS=['email',]

    objects= MasterEmployeeManager()

    def __str__(self):
        return str(self.username)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True


