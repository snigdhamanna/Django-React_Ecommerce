from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    seralizer = ProductSerializer(products, many=True)
    return Response(seralizer.data)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
    
    

# Create your views here.

# def home(request):
#     data ={
#         'message': 'welcome'
#     }
#     return JsonResponse(data)