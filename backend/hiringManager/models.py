from django.db import models

from adminManager.models import MasterEmployee, JobLocation


# class MasterEmployee(AbstractBaseUser):
#     email= models.EmailField(verbose_name="email",max_length=68, unique=True)
#     username=models.CharField(max_length=30, unique=True)
#     emp_name=models.CharField(max_length=30)
#     is_admin=models.BooleanField(default=False)
#     last_login=models.DateTimeField(verbose_name='last login', auto_now=True)
#     date_joined=models.DateTimeField(verbose_name="date joined", auto_now_add=True)
#     is_active=models.BooleanField(default=True)
#     is_staff=models.BooleanField(default=False)
#     is_superuser=models.BooleanField(default=False)

#     designation=models.ManyToManyField(JobRole)
#     location=models.ForeignKey(JobLocation, blank=True, null=True, on_delete=models.SET_NULL)


#     USERNAME_FIELD= 'username'
#     REQUIRED_FIELDS=['email',]

#     objects= MasterEmployeeManager()


class IndividualVacanciesManager(models.Manager):
    def create(self, hiringManager, master_vacancy, vac_name, vac_designation, project_name, 
            comments, yrs_of_exp, skills, vac_location, ind_vac_count):
        vacancy=self.model(
          vac_name=vac_name,
          vac_designation=vac_designation,
          project_name=project_name,
          yrs_of_exp=yrs_of_exp,
          comments=comments,
          master_vacancy=master_vacancy,
          hiringManager=hiringManager,
          vac_location=vac_location,
          ind_vac_count=ind_vac_count,
        )

        vacancy.save(using=self._db)
        
        for x in skills:
            vacancy.skills.add(x)
        




class MasterVacancyManager(models.Manager):
    def create(self, hiringManager, vac_name, vac_designation, project_name, comments, 
                yrs_of_exp, no_of_vacancies, skills, vac_location):
        vacancy=self.model(
           vac_name=vac_name,
           vac_designation=vac_designation,
           project_name=project_name,
           comments=comments,
           yrs_of_exp=yrs_of_exp,
           no_of_vacancies=no_of_vacancies,
           vac_location=vac_location,
           hiringManager=hiringManager,

        )

        vacancy.save(using=self._db)
        print("shon1")
        for x in skills:
            vacancy.skills.add(x)
        for i in range(0, no_of_vacancies):
            IndividualVacancies.objects.create(hiringManager, vacancy, vac_name, vac_designation, project_name, 
                                                comments, yrs_of_exp, skills, vac_location, i)    

        return vacancy


class MasterSkill(models.Model):
    skill_name=models.CharField(max_length=100, unique=True)


class MasterVacancy(models.Model):
    vac_name=models.CharField(max_length=30)
    date_of_posting=models.DateTimeField(verbose_name="posting date", auto_now_add=True)
    vac_designation=models.CharField(max_length=100)
    
    
    no_of_vacancies=models.IntegerField(max_length=10)
    project_name=models.CharField(max_length=50)
    yrs_of_exp=models.IntegerField(max_length=10)
    comments=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)
    status=models.CharField(max_length=30, default="Not yet started")



    skills=models.ManyToManyField(MasterSkill )
    vac_location=models.ForeignKey(JobLocation, blank=True, null=True, on_delete=models.SET_NULL)
    hiringManager=models.ForeignKey(MasterEmployee,blank=True, null=True, on_delete=models.CASCADE)

    objects=MasterVacancyManager()


class IndividualVacancies(models.Model):
    vac_name=models.CharField(max_length=30)
    date_of_posting=models.DateTimeField(verbose_name="posting date", auto_now_add=True)
    vac_designation=models.CharField(max_length=100)
    
    
    project_name=models.CharField(max_length=50)
    yrs_of_exp=models.IntegerField(max_length=10)
    ind_vac_count=models.IntegerField(max_length=10, default=0)
    comments=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)
    status=models.CharField(max_length=30, default="Not yet started")

    
    skills=models.ManyToManyField(MasterSkill )
    master_vacancy=models.ForeignKey(MasterVacancy, on_delete=models.CASCADE)
    vac_location=models.ForeignKey(JobLocation, blank=True, null=True, on_delete=models.SET_NULL)
    hiringManager=models.ForeignKey(MasterEmployee,blank=True, null=True, on_delete=models.CASCADE)

    objects= IndividualVacanciesManager()




    






