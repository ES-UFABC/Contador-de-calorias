import requests, bs4

#item = '1755-arroz-carreteiro'

class get_calories:

    def __init__(self, item):

        page = requests.get("https://vitat.com.br/alimentacao/busca-de-alimentos/alimentos/"+item)
        self.soup = bs4.BeautifulSoup(page.text, "lxml")     

        self.size_cal = len(str(self.soup.select('tr')[1]))
        self.cal = str(self.soup.select('tr')[1]) 

        self.size_carbo = len(str(self.soup.select('tr')[3]))
        self.carbo = str(self.soup.select('tr')[3]) 

        self.size_prot = len(str(self.soup.select('tr')[4]))
        self.prot = str(self.soup.select('tr')[4]) 

        self.size_lip = len(str(self.soup.select('tr')[5]))
        self.lip = str(self.soup.select('tr')[5]) 

        self.cal_value = self.get_cal_value()
        self.carbo_value = self.get_carbo_value()
        self.prot_value = self.get_prot_value()
        self.lip_value = self.get_lip_value()


    def get_cal_value(self):

        for i, j in zip(self.cal[::-1], range(self.size_cal)):    
            
            if i == 'l':
                kcal_str = self.cal[::-1][j+3] + self.cal[::-1][j+2] + self.cal[::-1][j+1] + i
                        
                if kcal_str == 'kcal':
                    break
                else:
                    continue
                        
        cal_value = ''
                        
        for i in range(j+5, j+20):
            if self.cal[::-1][i] != '>':
                cal_value += self.cal[::-1][i]
                    
            else:
                break

        return float(cal_value[::-1])   


    def get_carbo_value(self):

        for i, j in zip(self.carbo[::-1], range(self.size_carbo)):    
            
            if i == 'g':
                kcal_str = self.carbo[::-1][j+1] + i
                        
                if kcal_str == ' g':
                    break
                else:
                    continue
                        
        carbo_value = ''
                        
        for i in range(j+2, j+20):
            if self.carbo[::-1][i] != '>':
                carbo_value += self.carbo[::-1][i]
                    
            else:
                break

        return float(carbo_value[::-1])   


    def get_prot_value(self):

        for i, j in zip(self.prot[::-1], range(self.size_prot)):    
            
            if i == 'g':
                kcal_str = self.prot[::-1][j+1] + i
                        
                if kcal_str == ' g':
                    break
                else:
                    continue
                        
        prot_value = ''
                        
        for i in range(j+2, j+20):
            if self.prot[::-1][i] != '>':
                prot_value += self.prot[::-1][i]
                    
            else:
                break

        return float(prot_value[::-1])   


    def get_lip_value(self):

        for i, j in zip(self.lip[::-1], range(self.size_lip)):    
            
            if i == 'g':
                kcal_str = self.lip[::-1][j+1] + i
                        
                if kcal_str == ' g':
                    break
                else:
                    continue
                        
        lip_value = ''
                        
        for i in range(j+2, j+20):
            if self.lip[::-1][i] != '>':
                lip_value += self.lip[::-1][i]
                    
            else:
                break

        return float(lip_value[::-1])        
