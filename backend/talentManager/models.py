from django.db import models

from adminManager.models import MasterEmployee, JobLocation
from hiringManager.models import IndividualVacancies, MasterSkill,MasterVacancy


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


class MasterApplicantManager(models.Manager):
    def create(self, email, app_name, yrs_of_exp, skills, preffered_location):
        applicant=self.model(
           email=email,
           app_name=app_name,
           yrs_of_exp=yrs_of_exp,
           preffered_location=preffered_location,
          
        )

        applicant.save(using=self._db)
        for x in skills:
            applicant.skills.add(x)   

        return applicant


class InterviewLevel(models.Model):
    level_name=models.CharField(max_length=30, unique=True)
    sequence_number=models.IntegerField(max_length=10, unique=True)







class MasterApplicant(models.Model):

    email= models.EmailField(verbose_name="email",max_length=68, unique=True)
    app_name=models.CharField(max_length=30)
    date_of_registration=models.DateTimeField(verbose_name="registraiton joined", auto_now_add=True)
    is_active=models.BooleanField(default=True)

    
    yrs_of_exp=models.IntegerField(max_length=10)
    is_hired=models.BooleanField(default=False)
    is_complete=models.BooleanField(default=False)
    hire_status=models.CharField(max_length=30, default="Yet to be decided")
    complete_status=models.CharField(max_length=30, default="Not yet started")
    result=models.CharField(max_length=30, default="")


    vac_id=models.IntegerField(max_length=10, default=0)
    ind_vac_id=models.IntegerField(max_length=10, default=0)
    current_level=models.CharField(max_length=30, default="")


    skills=models.ManyToManyField(MasterSkill)
    preffered_location=models.ForeignKey(JobLocation, blank=True, null=True, on_delete=models.SET_NULL)
    master_vacancy=models.ForeignKey(MasterVacancy, blank=True, null=True, on_delete=models.SET_NULL)
    individual_vacancy=models.ForeignKey(IndividualVacancies, blank=True, null=True, on_delete=models.SET_NULL)

    objects=MasterApplicantManager()

    




class InterviewHistory(models.Model):
    interview_date=models.DateTimeField(verbose_name="interview date ", auto_now_add=True)
    result=models.CharField(max_length=20)
    is_passed=models.BooleanField(default=False)
    comments=models.CharField(max_length=100)
    app_id=models.IntegerField(max_length=10, default=0)

    applicant=models.ForeignKey(MasterApplicant, on_delete=models.CASCADE)
    interview_level=models.ForeignKey(InterviewLevel, on_delete=models.CASCADE)
    

