from web_scraping import get_calories

info = get_calories(item = '1755-arroz-carreteiro')

print('Tabela Nutricional arroz carreteiro:')
print('----------------------------------------------------')

print('Calorias: ' , info.cal_value ,'kcal')
print('Carboidratos: ' , info.carbo_value ,'g')
print('Proteinas: ' , info.prot_value ,'g')
print('Gorduras: ' , info.lip_value ,'g')
