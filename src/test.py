from web_scraping import get_calories
import json

f = open("//wsl.localhost/Ubuntu-20.04/home/delucca/Workspace/ufabc/eng_sof/Contador-de-calorias/src/urls.json")

x = json.load(f)

z = list(x.keys())[14]
y = x[z]


info = get_calories(item = str(y['url']))

print('Tabela Nutricional '+ str(z) + ":")
print('----------------------------------------------------')
print('Medida: ' + str(y['unity']))

print('Calorias: ' , info.cal_value ,'kcal')
print('Carboidratos: ' , info.carbo_value ,'g')
print('Proteinas: ' , info.prot_value ,'g')
print('Gorduras: ' , info.lip_value ,'g')

