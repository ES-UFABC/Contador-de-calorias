import numpy as np

class get_avg_macros:

    def __init__(self, weight, height, age, gender):

        self.weight = int(weight) #must be in kg
        self.height = int(height) #must be in cm
        self.age = int(age) #must be in years
        self.gender = str(gender) #must be "M" or "F"

        self.imc = self.evaluate_imc()
        self.tmp = self.evaluate_tmc()

        self.carbo_cals = int(self.evaluate_carbo_cals())
        self.prot_cals = int(self.evaluate_prot_cals())
        self.fat_cals = int(self.evaluate_fat_cals())

        self.carbo_g = np.round(float(self.evaluate_carbo_g()), 2)
        self.prot_g = np.round(float(self.evaluate_prot_g()), 2)
        self.fat_g = np.round(float(self.evaluate_fat_g()), 2)


    def evaluate_imc(self):

        return self.weight/(self.height**2)


    def evaluate_tmc(self):

        if self.gender.upper() == "M":

            tmp = 1.2*(66 + (13.7 * self.weight) + ( 5 * self.height) - (6.8 * self.age))

        elif self.gender.upper() == "F":

            tmp = 1.2*(655 + (9.6 * self.weight) + ( 1.8 * self.height) - (4.7 * self.age))
    

        return  tmp


    def evaluate_carbo_cals(self):

        return self.tmp*(0.5) 


    def evaluate_prot_cals(self):

        return self.tmp*(0.2) 


    def evaluate_fat_cals(self):

        return self.tmp*(0.3)


    def evaluate_carbo_g(self):

        return self.carbo_cals/4 


    def evaluate_prot_g(self):

        return self.tmp/4

    def evaluate_fat_g(self):

        return self.tmp/9                        