import pandas as pd
import numpy as np
import plotly.graph_objects as go

DATA_PATH = 'data_test/'

class evaluation:

    def __init__(self, account_id):

        self.account_id = account_id

        self.df_client_his = self.create_df()
        self.df_client_his['created_at'] = pd.to_datetime(self.df_client_his['created_at']) 
        self.df_client_his['created_at_date'] = self.df_client_his['created_at'].dt.date

        self.df_delta = self.eval_delta()

    def create_df(self):

        df_account = pd.read_csv(DATA_PATH + 'account.csv')
        df_log = pd.read_csv(DATA_PATH + 'log.csv')

        df_account.query('account_id == {}'.format(self.account_id), inplace = True)

        df_log.query('account_id == {}'.format(self.account_id), inplace = True)

        df = df_account.merge(df_log, on = 'account_id')

        return df

    def eval_delta(self):

        df_delta = pd.DataFrame()

        df_temp = self.df_client_his.copy()

        df_temp.sort_values(by = 'created_at', inplace = True)

        df_delta['account_id'] = self.account_id

        max = df_temp['created_at'].max()
        min = df_temp['created_at'].min()

        df_delta['delta_prot_tot'] = df_temp[df_temp['created_at'] == max]['protein'] - df_temp[df_temp['created_at'] == min]['protein']
        df_delta['delta_carbo_tot'] = df_temp[df_temp['created_at'] == max]['carbohydrate'] - df_temp[df_temp['created_at'] == min]['carbohydrate']
        df_delta['delta_fat_tot'] = df_temp[df_temp['created_at'] == max]['fat'] - df_temp[df_temp['created_at'] == min]['fat']
        df_delta['delta_cal_tot'] = df_temp[df_temp['created_at'] == max]['calories'] - df_temp[df_temp['created_at'] == min]['calories']

        df_delta['delta_prot_last'] = df_temp[df_temp['created_at'] == max]['protein'] - df_temp.iloc[1, :]['protein']
        df_delta['delta_carbo_last'] = df_temp[df_temp['created_at'] == max]['carbohydrate'] - df_temp.iloc[1, :]['carbohydrate']
        df_delta['delta_fat_last'] = df_temp[df_temp['created_at'] == max]['fat'] - df_temp.iloc[1, :]['fat']
        df_delta['delta_cal_tot'] = df_temp[df_temp['created_at'] == max]['calories'] - df_temp.iloc[1, :]['calories']

        return df_delta

    def gen_graph_macro_evol(self):

        #df_pivot = pd.pivot(self.df_client_his[['created_at_date',
        #                                              'weight',
        #                                              'protein',
        #                                              'carbohydrate',
        #                                              'fat',
        #                                              'calories',
        #                                              'account_id']], index = 'created_at_date', columns=['weight', 'protein', 'carbohydrate', 'fat', 'calories'])

        #df_pivot.to_csv('test.csv')
        #self.df_client_his.to_csv('test_2.csv')

        fig = go.Figure()

        for col in [ 'protein', 'carbohydrate', 'fat']:

            fig.add_trace(go.Scatter(x=self.df_client_his['created_at_date'], y=self.df_client_his[col].values,
                                    name = col,
                                    mode = 'markers+lines',
                                    line=dict(shape='linear'),
                                    connectgaps=True
                                    )
                        )
        fig.write_html("macro_evolution.html")

    def gen_graph_weight_evol(self):

        fig = go.Figure()

        fig.add_trace(go.Scatter(x=self.df_client_his['created_at_date'], y=self.df_client_his['weight'].values,
                                name = 'weight',
                                mode = 'markers+lines',
                                line=dict(shape='linear'),
                                connectgaps=True
                                )
                    )
        fig.write_html("weight_evolution.html")
