import csv
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request, Response, json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app, resources={r"/api/": {"origins": ""}})


@app.route('/')
def homepage():
  return 'Welcome to the Contador de Calorias API.'


@app.route('/getUsers', methods=['GET'])
def getAllUsers():
  users_df = pd.read_csv('users.csv', delimiter=';')
  users_df.rename(columns = {'username': 'userName'}, inplace = True)
  all_users = users_df.to_dict(orient='records')
  return jsonify(all_users)


@app.route('/getUsers/<string:name>', methods=['GET'])
def getUser(name):
  users_df = pd.read_csv('users.csv', delimiter=';')
  all_users = [users_df.to_dict(orient='records')]
  user = [searchUser for searchUser in all_users if all_users['names'] == name]
  print(user[0])
  return user

@app.route('/getFoods', methods=['GET'])
@cross_origin()
def getAllFoods():
  users_df = pd.read_csv('users.csv', delimiter=';')
  auth = request.headers['Authorization']
  user_token = users_df[((users_df['token']==int(auth)) & (users_df['token']==int(auth)))]
  if user_token.shape[0]==0:
    return Response(status=401)
  else:
    foods_df = pd.read_csv('foods.csv', delimiter=';')
    foods = foods_df.to_dict(orient='records')
    response = app.response_class(
      response=json.dumps(foods),
      status=200,
      mimetype='application/json'
    )
    return response

@app.route('/verifyUsername', methods=['POST'])
@cross_origin()
def verifyUsername(): 
  users_df = pd.read_csv('users.csv', delimiter=';')
  test2 = request.json['userName']
  print(test2)
  test_pw = request.json['password']
  print(test_pw)
  test3 = users_df[(users_df['username']==str(test2)) & (users_df['password']==int(test_pw))].copy()
  print(type(test3))
  if test3.shape[0]==0:
    return Response(status=401)
  else:
    test3.rename(columns = {'username': 'userName'}, inplace = True)
    resp = test3[['userName', 'token']]
    resp = resp.to_dict(orient='records')
    response = app.response_class(
      response=json.dumps(resp[0]),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )
    return response
#Response(jsonify(resp),status=200)

    
@app.route('/register', methods=['POST'])
@cross_origin()
def registerUser(): 
  users_df = pd.read_csv('users.csv', delimiter=';')
  username = request.json['userName']
  pw = request.json['password']
  check_user = users_df[(users_df['username']==str(username)) & (users_df['password']==pw)]
  if check_user.shape[0]==0:
    last_row = users_df.iloc[-1]
    id = int(last_row['id']) + 1
    token = int(last_row['token']) + 1
    fields=[id, username, pw, token]
    with open(r'users.csv', 'a') as f:
      writer = csv.writer(f, delimiter=";")
      writer.writerow(fields)

    demo_df = pd.read_csv('demographics.csv', sep=";")

    dtemp = {}
    
    dtemp['id'] = id
    dtemp['height'] = int(request.json['height'])
    dtemp['gender'] = str(request.json['gender'][0]).upper()
    dtemp['age'] = int(request.json['age'])
    dtemp['weight'] = int(request.json['weight'])
    print(dtemp)
    
    demo_df = demo_df.append(dtemp, ignore_index = True)

    demo_df.to_csv('demographics.csv', sep=";", index = False)
    return Response(status=200)
  else:
    return Response(status=400)

    
@app.route('/registerFood', methods=['POST'])
@cross_origin()
def registerFood(): 
  from backend.macro_calculus import get_avg_macros
  
  users_df = pd.read_csv('users.csv', delimiter=';')
  demo_df = pd.read_csv('demographics.csv', delimiter=';')
  token = request.headers['Authorization']
  users_id = users_df[users_df['token']==int(token)]['id'].values[0]
  
  del users_df

  foods = request.json['myFoods']
  
  qtd_1 = []
  cal_val = []
  carbo_val = []
  lip_val = []
  prot_val = []
  carbo_cals = []
  lip_cals = []
  prot_cals = [] 
  today = []
  logs = []
  
  
  for i in range(len(foods)):

    qtd =  int(foods[i]['quantidade'])   
    qtd_1.append(int(foods[i]['quantidade']))
    cal_val.append(float(foods[i]['cal_val'])*qtd)
    carbo_val.append(float(foods[i]['carbo_val'])*qtd)
    lip_val.append(float(foods[i]['lip_val'])*qtd)
    prot_val.append(float(foods[i]['prot_val'])*qtd)
    carbo_cals.append(float(foods[i]['carbo_val'])*4*qtd)
    lip_cals.append(float(foods[i]['lip_val'])*9*qtd)
    prot_cals.append(float(foods[i]['prot_val'])*4*qtd)
   # today.append(request.json['chosenDate'])

  df_temp = pd.DataFrame()

  df_temp['log_id'] = logs
  df_temp['id'] = [users_id]*len(foods)
  df_temp['weight'] = [demo_df[demo_df['id'] == users_id]['weight'].values[0]]*len(foods)
  df_temp['qtd'] =  qtd_1
  df_temp['protein'] = prot_val
  df_temp['carbohydrate'] = carbo_val
  df_temp['fat'] = lip_val
  df_temp['calories'] = cal_val
 # df_temp['created_at'] = today
  
  weight = demo_df[demo_df['id'] == users_id]['weight'].values[0]
  height = demo_df[demo_df['id'] == users_id]['height'].values[0]
  age = demo_df[demo_df['id'] == users_id]['age'].values[0]
  gender = demo_df[demo_df['id'] == users_id]['gender'].values[0]

  avg_macro = get_avg_macros(weight, height, age, gender)

  macros = {}
  macros['imc'] = avg_macro.imc
  macros['Taxa_metabolica_Basal_Kcal'] = avg_macro.tmb
  macros['Calorias_de_Carboidratos_Ideal_Kcal'] = avg_macro.carbo_cals
  macros['Quantidade_de_Carboidratos_Ideal_g'] = avg_macro.carbo_g
  macros['Calorias_de_Proteinas_Ideal_Kcal'] = avg_macro.prot_cals
  macros['Quantidade_de_Proteinas_Ideal_g'] = avg_macro.prot_g
  macros['Calorias_de_Gorduras_Ideal_Kcal'] = avg_macro.fat_cals
  macros['Quantidade_de_Gorduras_Ideal_g'] = avg_macro.fat_g

  macros['Variação_de_Carboidratos_Kcal'] = np.round( float(avg_macro.carbo_cals) - float(sum(carbo_cals)), 2)
  macros['Variação_de_Carboidratos_g'] = np.round( float(avg_macro.carbo_g) - float(sum(carbo_val)), 2)
  macros['Variação_de_Proteinas_Kcal'] = np.round( float(avg_macro.prot_cals) - float(sum(prot_cals)), 2)
  macros['Variação_de_Proteinas_g'] = np.round(float(avg_macro.prot_g)  - sum(prot_val), 2)
  macros['Variação_de_Gorduras_Kcal'] = np.round( float(avg_macro.fat_cals) - sum(lip_cals), 2)
  macros['Variação_de_Gorduras_g'] = np.round(float(avg_macro.fat_g) - sum(lip_val), 2)
     
  response = app.response_class(
      response=json.dumps(macros),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )
    
  return response


@app.route('/saveMeal', methods=['POST'])
@cross_origin()
def saveMeal(): 
  from backend.macro_calculus import get_avg_macros
  
  users_df = pd.read_csv('users.csv', delimiter=';')
  logs_df = pd.read_csv('log.csv', delimiter=';')
  demo_df = pd.read_csv('demographics.csv', delimiter=';')
  token = request.headers['Authorization']
  users_id = users_df[users_df['token']==int(token)]['id'].values[0]
  
  del users_df

  foods = request.json['myFoods']
  
  qtd_1 = []
  cal_val = []
  carbo_val = []
  lip_val = []
  prot_val = []
  carbo_cals = []
  lip_cals = []
  prot_cals = [] 
  today = []
  logs = []
  
  
  for i in range(len(foods)):

    qtd =  int(foods[i]['quantidade'])   
    qtd_1.append(int(foods[i]['quantidade']))
    cal_val.append(float(foods[i]['cal_val'])*qtd)
    carbo_val.append(float(foods[i]['carbo_val'])*qtd)
    lip_val.append(float(foods[i]['lip_val'])*qtd)
    prot_val.append(float(foods[i]['prot_val'])*qtd)
    carbo_cals.append(float(foods[i]['carbo_val'])*4*qtd)
    lip_cals.append(float(foods[i]['lip_val'])*9*qtd)
    prot_cals.append(float(foods[i]['prot_val'])*4*qtd)
    today.append(request.json['chosenDate'])
    try:
      z = int(logs_df['log_id'].max())+1+i
    except:
      z = +1+i
    logs.append(z)

  df_temp = pd.DataFrame()

  if logs_df[logs_df['id'] == users_id].shape[0]>0:
    meal_id = int(logs_df[logs_df['id'] == users_id]['meal_id'].max())+1

  else:
    meal_id = 1

  df_temp['log_id'] = logs
  df_temp['id'] = [users_id]*len(foods)
  df_temp['meal_id'] = [meal_id]*len(foods)
  df_temp['weight'] = [demo_df[demo_df['id'] == users_id]['weight'].values[0]]*len(foods)
  df_temp['qtd'] =  qtd_1
  df_temp['protein'] = prot_val
  df_temp['carbohydrate'] = carbo_val
  df_temp['fat'] = lip_val
  df_temp['calories'] = cal_val
  df_temp['created_at'] = today

  print(df_temp.columns, logs_df.columns)
  logs_df = pd.concat([logs_df, df_temp])

  logs_df.to_csv('log.csv', sep = ';', index = False)
  weight = demo_df[demo_df['id'] == users_id]['weight'].values[0]
  height = demo_df[demo_df['id'] == users_id]['height'].values[0]
  age = demo_df[demo_df['id'] == users_id]['age'].values[0]
  gender = demo_df[demo_df['id'] == users_id]['gender'].values[0]

  avg_macro = get_avg_macros(weight, height, age, gender)

  macros = {}
  macros['imc'] = avg_macro.imc
  macros['Taxa_metabolica_Basal_Kcal'] = avg_macro.tmb
  macros['Calorias_de_Carboidratos_Ideal_Kcal'] = avg_macro.carbo_cals
  macros['Quantidade_de_Carboidratos_Ideal_g'] = avg_macro.carbo_g
  macros['Calorias_de_Proteinas_Ideal_Kcal'] = avg_macro.prot_cals
  macros['Quantidade_de_Proteinas_Ideal_g'] = avg_macro.prot_g
  macros['Calorias_de_Gorduras_Ideal_Kcal'] = avg_macro.fat_cals
  macros['Quantidade_de_Gorduras_Ideal_g'] = avg_macro.fat_g

  macros['Variação_de_Carboidratos_Kcal'] = int(avg_macro.carbo_cals) - int(sum(carbo_cals))
  macros['Variação_de_Carboidratos_g'] = int(avg_macro.carbo_g) - int(sum(carbo_val))
  macros['Variação_de_Proteinas_Kcal'] = int(avg_macro.prot_cals) - int(sum(prot_cals))
  macros['Variação_de_Proteinas_g'] = int(avg_macro.prot_g)  - sum(prot_val)
  macros['Variação_de_Gorduras_Kcal'] = int(avg_macro.fat_cals) - sum(lip_cals)
  macros['Variação_de_Gorduras_g'] = int(avg_macro.fat_g) - sum(lip_val)
     
  response = app.response_class(
      response=json.dumps(macros),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )
    
  return response

@app.route('/dropMeal', methods=['POST'])
@cross_origin()
def dropMeal(): 
  
  users_df = pd.read_csv('users.csv', delimiter=';')
  logs_df = pd.read_csv('log.csv', delimiter=';')
  auth = request.headers['Authorization']
  meal_id = request.json['id']
  id = users_df[(users_df['token']==int(auth))]['id'].values[0]

  logs_df = logs_df[(logs_df['id'] == id) & ~(logs_df['meal_id'] == meal_id)]

  logs_df.to_csv('log.csv', sep = ';', index = False)

  return Response(status=200)
  

@app.route('/macroCalculus', methods=['GET'])
@cross_origin()
def macroCalculus(): 
  from backend.macro_calculus import get_avg_macros
  
  users_df = pd.read_csv('users.csv', delimiter=';')
  username = request.json['userName']
  user_id = users_df[users_df['username']==str(username)]['id'].values

  del username

  log_df = pd.read_csv('log.csv', delimiter=';')
  demo_df = pd.read_csv('demographics.csv', delimiter=';')

  temp_df = log_df[log_df['id']==user_id]
  temp_df = temp_df.merge(demo_df, on = 'id', how = 'inner')

  del log_df, demo_df
  
  log_id = temp_df['log_id'].max()
  last_register = temp_df[temp_df['log_id'] == log_id]
  weight = last_register['weight'].values
  height = last_register['height'].values
  age = last_register['age'].values
  gender = last_register['gender'].values

  avg_macro = get_avg_macros(weight, height, age, gender)

  macros = {}
  macros['id'] = user_id
  macros['imc'] = avg_macro.imc
  macros['tmb'] = avg_macro.tmb
  macros['carbo_cals'] = avg_macro.carbo_cals
  macros['carbo_g'] = avg_macro.carbo_g
  macros['prot_cals'] = avg_macro.prot_cals
  macros['prot_g'] = avg_macro.prot_g
  macros['fat_cals'] = avg_macro.fat_cals
  macros['fat_g'] = avg_macro.fat_g

  for i in ['protein','carbohydrate','fat','calories']:
    temp_df[i] = temp_df[i]*temp_df['qtd']

  del avg_macro
  
  eaten_carbo_g = temp_df['carbohydrate'].sum()
  eaten_carbo_cals = eaten_carbo_g*4
  eaten_prot_g = temp_df['protein'].sum()
  eaten_prot_cals = eaten_prot_g*4
  eaten_fat_g = temp_df['fat'].sum()
  eaten_fat_cals = eaten_fat_g*9
  eaten_calories = temp_df['calories'].sum()

  macros['eaten_carbo_g'] = eaten_carbo_g
  macros['eaten_carbo_cals'] = eaten_carbo_cals
  macros['eaten_prot_g'] = eaten_prot_g
  macros['eaten_prot_cals'] = eaten_prot_cals
  macros['eaten_fat_g'] = eaten_fat_g
  macros['eaten_fat_cals'] = eaten_fat_cals
  macros['eaten_calories'] = eaten_calories
  
  delta_carbo_g = macros['carbo_g']-eaten_carbo_g
  delta_carbo_cals = macros['carbo_cals']-eaten_carbo_cals
  delta_prot_g = macros['prot_g']-eaten_prot_g
  delta_prot_cals = macros['prot_cals']-eaten_prot_cals
  delta_fat_g = macros['fat_g']-eaten_fat_g
  delta_fat_cals = macros['fat_cals']-eaten_fat_cals
  delta_calories = macros['calories']-eaten_calories

  percent_carbo_g = np.round( 100*( delta_carbo_g/eaten_carbo_g))
  percent_carbo_cals = np.round( 100*( delta_carbo_cals/eaten_carbo_cals))
  percent_prot_g = np.round( 100*( delta_prot_g/eaten_prot_g))
  percent_prot_cals = np.round( 100*( delta_prot_cals/eaten_prot_cals))
  percent_fat_g = np.round( 100*( delta_fat_g/eaten_fat_g))
  percent_fat_cals = np.round( 100*( delta_fat_cals/eaten_fat_cals))
  percent_calories = np.round( 100*( delta_calories/eaten_calories))

  macros['percent_carbo_g'] =  percent_carbo_g
  macros['percent_carbo_cals'] = percent_carbo_cals
  macros['percent_prot_g'] = percent_prot_g
  macros['percent_prot_cals'] = percent_prot_cals
  macros['percent_fat_g'] = percent_fat_g
  macros['percent_fat_cals'] = percent_fat_cals
  macros['percent_calories'] = percent_calories
  macros['delta_carbo_g'] = delta_carbo_g
  macros['delta_carbo_cals'] = delta_carbo_cals
  macros['delta_prot_g'] = delta_prot_g
  macros['delta_prot_cals'] = delta_prot_cals
  macros['delta_fat_g'] = delta_fat_g
  macros['delta_fat_cals'] = delta_fat_cals
  macros['delta_calories'] = delta_calories

  response = app.response_class(
      response=json.dumps(macros),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )
    
  return response

@app.route('/calculate', methods=['POST'])
@cross_origin()
def calculate(): 
  
  cal_val = 0
  carbo_val = 0
  lip_val = 0
  prot_val = 0
  carbo_cals = 0
  lip_cals = 0
  prot_cals = 0   

  foods = request.json['myFoods']
  #print(foods, type(foods))
  
  for i in range(len(foods)):
    
    qtd =  int(foods[i]['quantidade'])
    cal_val += float(foods[i]['cal_val'])*qtd
    carbo_val += float(foods[i]['carbo_val'])*qtd
    lip_val += float(foods[i]['lip_val'])*qtd
    prot_val += float(foods[i]['prot_val'])*qtd
    carbo_cals += float(foods[i]['carbo_val'])*4*qtd
    lip_cals += float(foods[i]['lip_val'])*9*qtd
    prot_cals += float(foods[i]['prot_val'])*4*qtd

  responses = {}  

  responses['Calorias (Kcal)'] = int(cal_val)
  responses['Carboidatro (g)'] = int(carbo_val)
  responses['Carboidatro (Kcal)'] = int(carbo_cals)
  responses['Gorduras (g)'] = int(lip_val)
  responses['Gorduras (Kcal)'] = int(lip_cals)
  responses['Proteinas (g)'] = int(prot_val)
  responses['Proteinas (Kcal)'] = int(prot_cals)
    
  response = app.response_class(
      response=json.dumps(responses),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )
    
  return response

@app.route('/getMeals', methods=['GET'])
@cross_origin()
def getMeals():
  users_df = pd.read_csv('users.csv', delimiter=';')
  logs_df = pd.read_csv('log.csv', delimiter=';')
  auth = request.headers['Authorization']
  user_token = users_df[(users_df['token']==int(auth))]

  id = users_df[(users_df['token']==int(auth))]['id'].values[0]

  logs_df = logs_df[logs_df['id'] == id]
  
  temp = logs_df.groupby(['meal_id'])[['weight','protein','carbohydrate','fat','calories','created_at']].agg({'weight':'mean','protein':'sum','carbohydrate':'sum','fat':'sum','calories':'sum','created_at':'max'}).reset_index()


  temp.rename(columns = {'meal_id':'Refeicao_Numero','weight':'Peso', 'protein': 'Proteinas', 'carbohydrate': 'Carboidratos','fat':'Gorduras','calories':'Calorias','created_at':'Data'}, inplace = True)

  temp_dict = temp.to_dict(orient='records')
  #'index', 
    
  response = app.response_class(
      response=json.dumps(temp_dict),
      #response=jsonify(resp),
      status=200,
      mimetype='application/json'
    )  

  return response

@app.route('/getUserData', methods=['GET'])
@cross_origin()
def getUserData():
  auth = request.headers['Authorization']
  user_df = pd.read_csv('users.csv', delimiter=';')
  data_df = pd.read_csv('demographics.csv', delimiter=';')
  user_df = user_df[user_df['token']==int(auth)]
  if user_df.shape[0]==0:
    return Response(status=401)
  else:
    data_df = data_df[data_df['id']==user_df['id'].iloc[0]]
    data_df['userName'] = user_df['username'].iloc[0]
    resp = data_df.to_dict(orient='records')
    response = app.response_class(
      response=json.dumps(resp[0]),
      status=200,
      mimetype='application/json'
    )
    return response

@app.route('/setUserData', methods=['POST'])
@cross_origin()
def setUserData(): 
  token = request.json['token']
  username = request.json['userName']
  password = request.json['password']
  age =  request.json['age']
  gender = str(request.json['gender'][0]).upper()
  height = request.json['height']
  weight = request.json['weight']
  users_df = pd.read_csv('users.csv', delimiter=';')
  data_df = pd.read_csv('demographics.csv', delimiter=';')
  usersCheck_df = users_df[users_df['token']==int(token)]
  if usersCheck_df.shape[0]==0:
    return Response(status=401)
  else:
    users_df.loc[users_df['id']==usersCheck_df['id'].iloc[0], ['username']] = username
    users_df.loc[users_df['id']==usersCheck_df['id'].iloc[0], ['password']] = password
    data_df.loc[data_df['id']==usersCheck_df['id'].iloc[0], ['age']] = age
    data_df.loc[data_df['id']==usersCheck_df['id'].iloc[0], ['gender']] = gender
    data_df.loc[data_df['id']==usersCheck_df['id'].iloc[0], ['height']] = height
    data_df.loc[data_df['id']==usersCheck_df['id'].iloc[0], ['weight']] = weight
    users_df.to_csv('users.csv', sep=";", index = False)
    data_df.to_csv('demographics.csv', sep=";", index = False)
    response = app.response_class(
      status=200,
      mimetype='application/json'
    )
    return response

app.run(host='0.0.0.0')
